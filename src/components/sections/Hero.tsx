"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hero } from "@/lib/visual-assets.json";
import { afterFirstPaint } from "@/lib/after-first-paint";
import { ActionLink } from "../ui/Action";
import HeroTouchEffect from "../effects/HeroTouchEffect";

const HeroCanvas = dynamic(() => import("../effects/HeroCanvas"), {
  ssr: false,
});

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span
      className="inline-block overflow-hidden pb-[0.13em] align-top"
      aria-hidden="true"
    >
      {Array.from(text).map((letter, index) => (
        <span
          key={index}
          className="hero-letter inline-block whitespace-pre"
          style={
            {
              "--letter-delay": `${0.15 + (index + offset) * 0.055}s`,
            } as CSSProperties
          }
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const photograph = useRef<HTMLImageElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [desktopEffect, setDesktopEffect] = useState(false);

  useEffect(() => {
    const image = photograph.current;
    if (!image || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const pointer = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    const updatePointer = () => setDesktopEffect(pointer.matches);
    updatePointer();
    pointer.addEventListener("change", updatePointer);
    let disposed = false;
    let cancelPaint = () => {};
    const enhance = async () => {
      await image.decode().catch(() => {});
      if (disposed) return;
      cancelPaint = afterFirstPaint(() => {
        if (!disposed) setCanvasReady(true);
      });
    };
    if (image.complete) void enhance();
    else image.addEventListener("load", enhance, { once: true });
    return () => {
      disposed = true;
      cancelPaint();
      image.removeEventListener("load", enhance);
      pointer.removeEventListener("change", updatePointer);
    };
  }, []);

  const sizes = "(max-width: 767px) calc(100vw - 24px), calc(100vw - 40px)";
  return (
    <section
      id="acasa"
      aria-label="FASON — Creative hair studio"
      className="relative m-3 h-[calc(100svh-24px)] min-h-[650px] overflow-hidden rounded-xl bg-ink text-cream md:m-5 md:h-[calc(100svh-40px)] md:min-h-[700px]"
    >
      <div className="hero-visual absolute inset-0">
        <picture>
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet={hero.desktop.srcSet}
            sizes={sizes}
          />
          <source type="image/webp" srcSet={hero.mobile.srcSet} sizes={sizes} />
          <img
            src={hero.mobile.src}
            width={hero.mobile.width}
            height={hero.mobile.height}
            sizes={sizes}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            ref={photograph}
            alt="Tunsoare FASON: bob blond geometric, breton cu accente galbene"
            draggable={false}
            className="hero-photograph absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <HeroTouchEffect imageRef={photograph} />
        {canvasReady && desktopEffect && <HeroCanvas />}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-linear-to-b from-ink/65 via-ink/40 via-50% to-ink/0"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/60" />
      <div className="hero-heading pointer-events-none absolute inset-x-5 top-[17%] z-10 md:inset-x-8 md:top-[16%]">
        <h1
          aria-label="Mai mult tu."
          className="flex flex-col text-[19.2vw] leading-[0.82] font-medium tracking-[-0.065em] text-gold md:flex-row md:justify-center md:gap-[0.2em] md:text-[16.4vw]"
        >
          <Letters text="mai mult" />
          <span className="-mt-1 self-end md:mt-0 md:self-auto">
            <Letters text="tu." offset={8} />
          </span>
        </h1>
        <div className="hero-intro mt-2 hidden items-center justify-between px-[7%] md:flex">
          <span className="rounded-full bg-cream/90 px-3 py-1 text-[9px] tracking-tight text-ink">
            O formă de expresie.
          </span>
          <span className="rounded-full bg-cream/90 px-3 py-1 text-[9px] tracking-tight text-ink">
            Un look. O energie. Tu.
          </span>
        </div>
      </div>
      <div className="hero-intro absolute inset-x-5 bottom-[12%] z-10 flex flex-col items-center text-center md:bottom-[11%]">
        <p className="mb-5 text-[8px] tracking-[0.22em] uppercase">
          Hair as a form of self-expression
        </p>
        <p className="font-editorial text-[30px] leading-[1.03] sm:text-4xl md:text-[42px]">
          Părul tău. Energia ta.
          <br />
          <em>O nouă perspectivă.</em>
        </p>
        <ActionLink
          href="#programari"
          variant="solid"
          tone="light"
          className="mt-6"
        >
          Vorbește cu noi
        </ActionLink>
      </div>
      <span className="hero-intro absolute right-8 bottom-9 hidden text-[9px] tracking-[0.1em] md:block">
        FORMĂ. CULOARE. ATITUDINE.
      </span>
    </section>
  );
}
