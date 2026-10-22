"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { afterFirstPaint } from "@/lib/after-first-paint";

export function MotionProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const mount = (create: (root: HTMLElement) => () => void) => {
      if (!disposed && !cleanup && !document.querySelector("dialog[open]"))
        cleanup = create(scope);
    };
    let ready: ((root: HTMLElement) => () => void) | undefined;
    const onDialog = () => {
      if (ready) mount(ready);
    };
    window.addEventListener("fason:dialog", onDialog);
    const cancelPaint = afterFirstPaint(() => {
      void import("./motion-controller")
        .then(({ createMotionController }) => {
          ready = createMotionController;
          mount(createMotionController);
        })
        .catch(() => {
          /* Native anchors and visible content remain available. */
        });
    });
    return () => {
      disposed = true;
      cancelPaint();
      window.removeEventListener("fason:dialog", onDialog);
      cleanup?.();
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
