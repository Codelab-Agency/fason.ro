import gsap from "gsap";

/** Called inside the provider's GSAP context so every scene reverts together. */
export function createScrollScenes(scope: HTMLElement) {
  const removeListeners: Array<() => void> = [];
  const photoScenes: gsap.core.Timeline[] = [];
  const pausedPhotos = new Set<gsap.core.Timeline>();

  function finishOnFocus(element: HTMLElement, animation: gsap.core.Animation) {
    const finish = () => {
      animation.scrollTrigger?.kill(false, true);
      animation.progress(1);
    };
    element.addEventListener("focusin", finish);
    removeListeners.push(() => element.removeEventListener("focusin", finish));
    if (element.contains(document.activeElement)) finish();
  }

  scope
    .querySelectorAll<HTMLElement>("[data-scroll-title]")
    .forEach((title) => {
      const words = title.querySelectorAll("[data-scroll-word]");
      gsap.fromTo(
        words,
        { yPercent: 115, rotation: 3, transformOrigin: "0% 100%" },
        {
          yPercent: 0,
          rotation: 0,
          duration: 1.05,
          stagger: 0.075,
          ease: "power4.out",
          scrollTrigger: { trigger: title, start: "top 90%", once: true },
        },
      );
    });

  scope
    .querySelectorAll<HTMLElement>("[data-photo-reveal]")
    .forEach((frame) => {
      if (!frame.clientWidth || !frame.clientHeight) return;
      const image = frame.querySelector("img");
      const filter = frame.querySelector<SVGFilterElement>(
        "[data-photo-filter]",
      );
      const displacement = frame.querySelector("[data-photo-displacement]");
      const wave = frame.querySelector("[data-photo-wave]");
      const caption = frame.parentElement?.querySelector(
        "[data-photo-caption]",
      );
      const compact = window.matchMedia("(max-width: 767px)").matches;
      const enterAt =
        !compact && frame.dataset.photoDelayed === "true" ? 0.12 : 0;
      const scene = gsap.timeline({
        scrollTrigger: {
          trigger: frame.parentElement,
          start: "top 88%",
          once: true,
        },
        onStart: () => {
          if (image && filter) {
            gsap.set(image, { filter: `url("#${filter.id}")` });
          }
        },
        onComplete: () => {
          gsap.set(frame, {
            clearProps: "opacity",
          });
          if (image)
            gsap.set(image, { clearProps: "filter,transform,transformOrigin" });
        },
      });
      scene.fromTo(
        frame,
        { opacity: 0.35 },
        {
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
        },
        enterAt,
      );
      if (image) {
        scene.fromTo(
          image,
          {
            scale: compact ? 1.025 : 1.035,
            transformOrigin: "50% 50%",
          },
          {
            scale: 1,
            duration: compact ? 1 : 1.2,
            ease: "power3.out",
          },
          enterAt,
        );
      }
      if (image && filter && displacement && wave) {
        scene.fromTo(
          displacement,
          { attr: { scale: compact ? 22 : 32 } },
          {
            attr: { scale: 0 },
            duration: compact ? 1 : 1.2,
            ease: "power2.out",
          },
          enterAt,
        );
        scene.fromTo(
          wave,
          { attr: { dy: compact ? -12 : -20 } },
          {
            attr: { dy: 0 },
            duration: compact ? 1 : 1.2,
            ease: "power1.out",
          },
          enterAt,
        );
      }
      if (caption) {
        scene.fromTo(
          caption,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
          enterAt + 0.3,
        );
      }
      finishOnFocus(frame, scene);
      photoScenes.push(scene);
    });

  // Keep a photo's surface still while a menu or gallery is in front of it.
  const onDialog = (event: Event) => {
    const open = (event as CustomEvent<{ open: boolean }>).detail.open;
    if (open) {
      photoScenes.forEach((scene) => {
        if (!scene.isActive()) return;
        scene.pause();
        pausedPhotos.add(scene);
      });
    } else {
      pausedPhotos.forEach((scene) => {
        if (scene.progress() < 1) scene.resume();
      });
      pausedPhotos.clear();
    }
  };
  window.addEventListener("fason:dialog", onDialog);
  removeListeners.push(() =>
    window.removeEventListener("fason:dialog", onDialog),
  );

  scope
    .querySelectorAll<HTMLElement>("[data-service-reveal]")
    .forEach((service, index) => {
      const scene = gsap.fromTo(
        service,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: (index % 3) * 0.04,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: service, start: "top 91%", once: true },
        },
      );
      finishOnFocus(service, scene);
    });

  scope.querySelectorAll<HTMLElement>("[data-ink-story]").forEach((story) => {
    gsap.fromTo(
      story.querySelectorAll("[data-ink-word]"),
      { opacity: 0.6 },
      {
        opacity: 1,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: story,
          start: "top 82%",
          end: "bottom 60%",
          scrub: 0.45,
        },
      },
    );
  });

  scope.querySelectorAll<HTMLElement>("[data-scroll-rule]").forEach((rule) => {
    gsap.fromTo(
      rule,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rule.parentElement,
          start: "top 90%",
          end: "top 60%",
          scrub: 0.6,
        },
      },
    );
  });

  scope
    .querySelectorAll<HTMLElement>("[data-action-arrow]")
    .forEach((arrow) => {
      gsap.fromTo(
        arrow,
        { rotation: -100, scale: 0.45 },
        {
          rotation: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: arrow, start: "top 92%", once: true },
        },
      );
    });

  return () => removeListeners.forEach((remove) => remove());
}
