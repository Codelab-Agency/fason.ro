"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Arrow, Close } from "../ui/Icon";
import { Logo } from "../ui/Logo";

export type GalleryLook = {
  id: string;
  title: string;
  service: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  position: string;
};

export type GallerySelection = {
  index: number;
  previews: string[];
};

type Phase = "opening" | "open" | "changing" | "closing";
type Frame = { left: number; top: number; width: number; height: number };

function imageFrame(stage: HTMLElement, look: GalleryLook): Frame {
  const bounds = stage.getBoundingClientRect();
  const scale = Math.min(
    bounds.width / look.width,
    bounds.height / look.height,
  );
  const width = look.width * scale;
  const height = look.height * scale;
  return {
    left: bounds.left + (bounds.width - width) / 2,
    top: bounds.top + (bounds.height - height) / 2,
    width,
    height,
  };
}

export function PortfolioGallery({
  looks,
  selection,
  onClose,
}: {
  looks: GalleryLook[];
  selection: GallerySelection;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState({
    active: selection.index,
    previous: null as number | null,
    direction: 1,
  });
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const phase = useRef<Phase>("opening");
  const currentIndex = useRef(selection.index);
  const requestedIndex = useRef(selection.index);
  const direction = useRef(1);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const transition = useRef<gsap.core.Timeline | null>(null);
  const outro = useRef<gsap.core.Timeline | null>(null);
  const media = useRef<MediaQueryList | null>(null);
  const disposed = useRef(false);
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const active = looks[slide.active];

  const setPhase = useCallback((value: Phase) => {
    phase.current = value;
    if (dialog.current) dialog.current.dataset.state = value;
  }, []);

  const startPending = useCallback(() => {
    if (
      disposed.current ||
      phase.current !== "open" ||
      requestedIndex.current === currentIndex.current
    )
      return;
    const previous = currentIndex.current;
    const next = requestedIndex.current;
    currentIndex.current = next;
    if (media.current?.matches) {
      setSlide({ active: next, previous: null, direction: direction.current });
      return;
    }
    setPhase("changing");
    setSlide({ active: next, previous, direction: direction.current });
  }, [setPhase]);

  const select = useCallback(
    (index: number, step: number) => {
      if (phase.current === "closing") return;
      requestedIndex.current = (index + looks.length) % looks.length;
      direction.current = step;
      startPending();
    },
    [looks.length, startPending],
  );

  const move = useCallback(
    (step: number) => select(requestedIndex.current + step, step),
    [select],
  );

  const finish = useCallback(() => {
    if (disposed.current) return;
    dialog.current?.close();
    onClose();
  }, [onClose]);

  const dismiss = useCallback(() => {
    if (phase.current === "closing") return;
    setPhase("closing");
    pointer.current = null;
    requestedIndex.current = currentIndex.current;
    intro.current?.kill();
    transition.current?.kill();
    const element = dialog.current!;
    gsap.killTweensOf(element.querySelectorAll("[data-gallery-layer]"));
    if (
      media.current?.matches ||
      Number(gsap.getProperty(element, "opacity")) < 0.02
    ) {
      finish();
      return;
    }
    const scene = gsap.timeline({ onComplete: finish });
    outro.current = scene;
    scene.to(element, {
      opacity: 0,
      duration: 0.18,
      ease: "power1.in",
    });
  }, [finish, setPhase]);

  useLayoutEffect(() => {
    const element = dialog.current!;
    const opener = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    disposed.current = false;
    setPhase("opening");
    media.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // Cover the reserved scrollbar gutter without widening the page behind it.
    element.style.width = `${window.innerWidth}px`;
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    window.dispatchEvent(
      new CustomEvent("fason:dialog", { detail: { open: true } }),
    );

    const ready = () => {
      if (disposed.current || phase.current === "closing") return;
      gsap.set(element, { clearProps: "opacity" });
      setPhase("open");
      startPending();
    };
    if (media.current.matches) {
      ready();
    } else {
      const scene = gsap.timeline({ onComplete: ready });
      intro.current = scene;
      scene.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration: 0.24, ease: "power1.out" },
      );
    }

    const onResize = () => {
      element.style.width = `${window.innerWidth}px`;
      if (phase.current === "opening") intro.current?.progress(1);
      else if (phase.current === "closing") finish();
    };
    const onMotionChange = () => {
      if (!media.current?.matches) return;
      if (phase.current === "closing") finish();
      else {
        intro.current?.progress(1);
        transition.current?.progress(1);
      }
    };
    window.addEventListener("resize", onResize);
    media.current.addEventListener("change", onMotionChange);
    return () => {
      disposed.current = true;
      intro.current?.kill();
      transition.current?.kill();
      outro.current?.kill();
      gsap.killTweensOf(element.querySelectorAll("[data-gallery-layer]"));
      window.removeEventListener("resize", onResize);
      media.current?.removeEventListener("change", onMotionChange);
      element.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
      window.dispatchEvent(
        new CustomEvent("fason:dialog", { detail: { open: false } }),
      );
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [finish, looks, selection, setPhase, startPending]);

  useLayoutEffect(() => {
    if (slide.previous === null) return;
    const element = dialog.current!;
    const current = element.querySelector<HTMLElement>(
      "[data-gallery-current]",
    )!;
    const previous = element.querySelector<HTMLElement>(
      "[data-gallery-previous]",
    )!;
    const caption = element.querySelector("[data-gallery-caption]");
    gsap.killTweensOf(previous);
    gsap.set(current, { x: slide.direction * 60, opacity: 0, scale: 1.025 });
    gsap.set(caption, { y: 8, opacity: 0 });
    const scene = gsap.timeline({
      onComplete: () => {
        if (disposed.current || phase.current === "closing") return;
        setSlide((value) => ({ ...value, previous: null }));
        setPhase("open");
        startPending();
      },
    });
    transition.current = scene;
    scene.to(
      previous,
      {
        x: -slide.direction * 45,
        scale: 0.98,
        opacity: 0,
        duration: 0.42,
        ease: "power2.inOut",
      },
      0,
    );
    scene.to(
      current,
      { x: 0, scale: 1, opacity: 1, duration: 0.65, ease: "power3.out" },
      0.08,
    );
    scene.to(
      caption,
      { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
      0.18,
    );
    return () => {
      scene.kill();
    };
  }, [slide.active, slide.previous, slide.direction, setPhase, startPending]);

  function pointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || phase.current !== "open") return;
    pointer.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = pointer.current;
    if (!start || start.id !== event.pointerId || phase.current !== "open")
      return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (
      Math.abs(x) > 8 &&
      Math.abs(x) > Math.abs(y) &&
      !media.current?.matches
    ) {
      const layer = dialog.current?.querySelector("[data-gallery-current]");
      if (layer)
        gsap.set(layer, {
          x: Math.max(-65, Math.min(65, x * 0.3)),
        });
    }
  }

  function resetDrag() {
    pointer.current = null;
    const layer = dialog.current?.querySelector("[data-gallery-current]");
    if (phase.current === "open" && layer)
      gsap.to(layer, {
        x: 0,
        duration: 0.3,
        ease: "power3.out",
      });
  }

  function pointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = pointer.current;
    pointer.current = null;
    if (!start || start.id !== event.pointerId || phase.current !== "open")
      return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y) * 1.25) {
      move(x < 0 ? 1 : -1);
      return;
    }
    resetDrag();
    if (Math.abs(x) + Math.abs(y) > 10) return;
    const frame = imageFrame(stage.current!, looks[currentIndex.current]);
    if (
      event.clientX < frame.left ||
      event.clientX > frame.left + frame.width ||
      event.clientY < frame.top ||
      event.clientY > frame.top + frame.height
    )
      dismiss();
  }

  const shown =
    slide.previous === null ? [slide.active] : [slide.previous, slide.active];
  return (
    <dialog
      ref={dialog}
      id="portfolio-gallery"
      aria-label={active.title}
      aria-describedby="gallery-service"
      data-state="opening"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const buttons =
            event.currentTarget.querySelectorAll<HTMLButtonElement>(
              "button:not(:disabled)",
            );
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus({ preventScroll: true });
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus({ preventScroll: true });
          }
        }
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
      className="portfolio-gallery fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-cream outline-none"
    >
      <div className="absolute inset-0 bg-ink" />
      <div className="relative z-10 grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:gap-5 sm:px-10 lg:px-12 [@media(max-height:500px)]:gap-2 [@media(max-height:500px)]:py-3">
        <header className="flex min-h-11 items-center justify-between gap-6">
          <Logo decorative className="h-auto w-[124px] md:w-[140px]" />
          <span className="hidden text-[10px] tracking-[0.08em] text-cream/60 uppercase sm:block">
            Colecțiile FASON
          </span>
          <button
            ref={closeButton}
            type="button"
            onClick={dismiss}
            aria-label="Închide galeria"
            className="group flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/25 bg-ink text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            <Close className="size-5 transition-transform duration-500 group-hover:rotate-90 motion-reduce:transition-none" />
          </button>
        </header>
        <div
          ref={stage}
          data-gallery-stage
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={resetDrag}
          className="relative min-h-0 min-w-0 select-none [touch-action:pan-y_pinch-zoom]"
        >
          {shown.map((index) => (
            <div
              key={looks[index].id}
              data-gallery-layer
              data-gallery-current={index === slide.active || undefined}
              data-gallery-previous={index !== slide.active || undefined}
              aria-hidden={index !== slide.active || undefined}
              className="pointer-events-none absolute inset-0 will-change-transform"
            >
              <Image
                src={looks[index].image}
                alt={index === slide.active ? looks[index].alt : ""}
                fill
                quality={85}
                loading="eager"
                sizes="(max-width: 767px) calc(100vw - 48px), 65vh"
                placeholder="blur"
                blurDataURL={selection.previews[index]}
                draggable={false}
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <footer className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end sm:gap-8 [@media(max-height:500px)_and_(min-width:500px)]:flex-row [@media(max-height:500px)_and_(min-width:500px)]:items-end [@media(max-height:500px)_and_(min-width:500px)]:gap-4">
          <div data-gallery-caption key={active.id} className="min-w-0">
            <h2
              aria-live="polite"
              aria-atomic="true"
              className="text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.2] tracking-[-0.04em]"
            >
              {active.title}
            </h2>
            <p
              id="gallery-service"
              className="mt-2 text-[11px] leading-relaxed text-gold [@media(max-height:500px)]:mt-1"
            >
              {active.service}
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-3 self-stretch sm:self-auto [@media(max-height:500px)]:gap-1 [@media(max-height:500px)]:self-auto">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Fotografia precedentă"
              className="group flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/25 transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              <Arrow
                direction="left"
                className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transform-none"
              />
            </button>
            <div
              aria-label="Alege o fotografie"
              role="group"
              className="flex items-center"
            >
              {looks.map((look, index) => (
                <button
                  key={look.id}
                  type="button"
                  aria-label={`Vezi ${look.title}`}
                  aria-current={slide.active === index || undefined}
                  onClick={() => select(index, index > slide.active ? 1 : -1)}
                  className="group flex min-h-11 w-9 items-center justify-center sm:w-10 [@media(max-height:500px)]:w-8"
                >
                  <span
                    className={`h-px transition-[width,background-color] duration-500 motion-reduce:transition-none ${slide.active === index ? "w-8 bg-gold" : "w-3 bg-cream/35 group-hover:w-5 group-hover:bg-cream"}`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Fotografia următoare"
              className="group flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/25 transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              <Arrow
                direction="right"
                className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
