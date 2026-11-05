"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hero } from "@/lib/visual-assets.json";
import { afterFirstPaint } from "@/lib/after-first-paint";
import HeroTouchEffect from "../effects/HeroTouchEffect";

const HeroCanvas = dynamic(() => import("../effects/HeroCanvas"), {
  ssr: false,
});

function HeroWords({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span key={word}>
          {index > 0 ? " " : null}
          <span
            className="hero-letter inline-block max-w-full wrap-anywhere"
            style={
              {
                "--letter-delay": `${0.2 + (index + offset) * 0.12}s`,
              } as CSSProperties
            }
          >
            {word}
          </span>
        </span>
      ))}
    </>
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
      aria-label="FASON — Hair & Beauty Salon"
      className="relative m-3 min-h-[max(650px,calc(100svh-24px))] overflow-hidden rounded-xl bg-ink text-cream md:m-5 md:min-h-[max(700px,calc(100svh-40px))]"
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0.12)_0%,transparent_35%,rgba(20,17,15,0.45)_55%,rgba(20,17,15,0.88)_82%,rgba(20,17,15,0.96)_100%)]"
      />
      <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-end px-5 pt-[max(25rem,50svh)] pb-8 text-center sm:px-8 md:pt-[max(23rem,48svh)] md:pb-12 lg:pb-14">
        <div className="hero-heading w-full min-w-0">
          <h1
            aria-label="FASON — În căutarea frumuseții"
            className="text-[clamp(2.5rem,11.2vw,3.75rem)] leading-[1.08] font-medium tracking-[-0.045em] md:text-[clamp(3.5rem,7.2vw,8.25rem)]"
          >
            <span
              aria-hidden="true"
              className="mb-4 block text-[0.75rem] leading-[1.5] tracking-[0.22em] text-cream/85 uppercase md:mb-5 md:text-[0.875rem]"
            >
              FASON
            </span>
            <span
              aria-hidden="true"
              className="block md:flex md:flex-wrap md:items-baseline md:justify-center md:gap-x-[0.22em]"
            >
              <span className="block">
                <HeroWords text="În căutarea" />
              </span>{" "}
              <span className="block font-editorial font-normal italic tracking-[-0.025em] text-gold">
                <HeroWords text="frumuseții" offset={2} />
              </span>
            </span>
          </h1>
        </div>
        <div className="hero-intro mt-6 flex flex-col items-center md:mt-7">
          <p className="text-[0.75rem] leading-[1.5] tracking-[0.04em] text-cream/85 md:text-[0.8125rem]">
            Cu drag de oameni
          </p>
          <p className="mt-2 max-w-[25ch] font-editorial text-[clamp(1.4rem,5.5vw,1.75rem)] leading-[1.3] text-pretty md:mt-3 md:max-w-none md:text-[clamp(1.5rem,2.1vw,2.125rem)]">
            Autenticitate cu stil și eleganță
          </p>
        </div>
      </div>
    </section>
  );
}
