"use client";

import { useEffect, type RefObject } from "react";

/** CSS owns the one-shot touch entrance; dialogs hold its current frame. */
export default function HeroTouchEffect({
  imageRef,
}: {
  imageRef: RefObject<HTMLImageElement | null>;
}) {
  useEffect(() => {
    const photograph = imageRef.current;
    if (!photograph) return;
    if (document.querySelector("dialog[open]"))
      photograph.style.animationPlayState = "paused";
    const onDialog = (event: Event) => {
      const open = (event as CustomEvent<{ open: boolean }>).detail.open;
      photograph.style.animationPlayState = open ? "paused" : "";
    };
    window.addEventListener("fason:dialog", onDialog);
    return () => {
      photograph.style.removeProperty("animation-play-state");
      window.removeEventListener("fason:dialog", onDialog);
    };
  }, [imageRef]);
  return null;
}
