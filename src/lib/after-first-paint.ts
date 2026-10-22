/** Schedule optional effects after content has reached the screen. */
export function afterFirstPaint(callback: () => void) {
  let cancelled = false;
  let frame = 0;
  let observer: PerformanceObserver | undefined;
  const schedule = () => {
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (!cancelled) callback();
      });
    });
  };
  if (
    performance.getEntriesByName("first-contentful-paint").length ||
    typeof PerformanceObserver === "undefined" ||
    !PerformanceObserver.supportedEntryTypes?.includes("paint")
  ) {
    schedule();
  } else {
    observer = new PerformanceObserver((list) => {
      if (!list.getEntriesByName("first-contentful-paint").length) return;
      observer?.disconnect();
      schedule();
    });
    observer.observe({ type: "paint", buffered: true });
  }
  return () => {
    cancelled = true;
    observer?.disconnect();
    cancelAnimationFrame(frame);
  };
}
