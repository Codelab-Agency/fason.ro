"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { portfolio } from "@/lib/salon";
import type { GallerySelection } from "./PortfolioGallery";
import { Arrow } from "../ui/Icon";
import { PhotoReveal } from "../effects/PhotoReveal";
import { RevealWords } from "../effects/RevealWords";
import { SectionLabel } from "../ui/SectionLabel";

const PortfolioGallery = dynamic(
  () => import("./PortfolioGallery").then((module) => module.PortfolioGallery),
  {
    ssr: false,
    loading: () => (
      <p role="status" className="sr-only">
        Se încarcă galeria…
      </p>
    ),
  },
);
const warmGallery = () => {
  void import("./PortfolioGallery").catch(() => {});
};

const looks = [
  {
    ...portfolio[3],
    title: "Volum & textură",
    service: "Coafat și styling",
    layout: "md:col-span-6",
    position: "50% 10%",
    width: 2616,
    height: 3539,
  },
  {
    ...portfolio[1],
    title: "Culoare creativă",
    service: "Colorare și styling",
    layout: "md:col-span-6",
    position: "50% 5%",
    width: 2616,
    height: 3136,
  },
  {
    id: "volume",
    title: "Textură în mișcare",
    service: "Styling",
    image: "/images/collection-volume.jpg",
    alt: "Coafură FASON cu volum și păr blond lung, în mișcare",
    layout: "md:col-span-6",
    position: "50% 20%",
    width: 2616,
    height: 3539,
  },
  {
    ...portfolio[0],
    title: "Blond geometric",
    service: "Tunsoare și culoare",
    layout: "md:col-span-6",
    position: "50% 30%",
    width: 3002,
    height: 4061,
  },
];

export function Portfolio() {
  const [selected, setSelected] = useState<GallerySelection | null>(null);
  const closeGallery = useCallback(() => setSelected(null), []);
  useEffect(() => {
    if (!selected) return;
    const cancelPendingGallery = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !document.querySelector("#portfolio-gallery[open]")
      )
        setSelected(null);
    };
    window.addEventListener("keydown", cancelPendingGallery);
    return () => window.removeEventListener("keydown", cancelPendingGallery);
  }, [selected]);

  return (
    <section
      id="portofoliu"
      className="page-padding section-space bg-ink text-cream"
    >
      <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <div>
          <div data-reveal className="mb-6">
            <SectionLabel dark>Colecțiile FASON</SectionLabel>
          </div>
          <h2
            data-scroll-title
            className="text-[clamp(2.8rem,7vw,7rem)] leading-[1.04] font-medium tracking-[-0.055em] [word-spacing:0.03em]"
          >
            <RevealWords text="Fă-ți" />{" "}
            <span className="section-emphasis text-gold">
              <RevealWords text="de cap." />
            </span>
          </h2>
        </div>
        <p data-reveal className="section-copy max-w-[270px] text-cream/65">
          Forme, texturi și culoare.
          <br />
          Din colecțiile noastre.
        </p>
      </div>
      <div className="grid gap-x-5 gap-y-10 md:grid-cols-12 md:gap-y-12 lg:gap-x-8">
        {looks.map((item, index) => (
          <figure key={item.id} className={`min-w-0 ${item.layout}`}>
            <PhotoReveal delayed={index % 2 === 1}>
              <button
                type="button"
                data-gallery-trigger={item.id}
                onPointerEnter={warmGallery}
                onPointerDown={warmGallery}
                onFocus={warmGallery}
                onClick={() => {
                  setSelected({
                    index,
                    previews: looks.map(
                      (look) =>
                        document.querySelector<HTMLImageElement>(
                          `[data-gallery-trigger="${look.id}"] img`,
                        )?.currentSrc || look.image,
                    ),
                  });
                }}
                aria-label={`Deschide ${item.title}`}
                aria-haspopup="dialog"
                className="group relative block aspect-[0.95] w-full overflow-hidden bg-[#302a28] text-left outline -outline-offset-1 outline-white/10 md:aspect-auto md:h-[clamp(26rem,45vw,40rem)]"
              >
                <Image
                  src={
                    item.id === "golden"
                      ? "/images/hero-landscape.jpg"
                      : item.image
                  }
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(50vw - 50px), calc(50vw - 112px)"
                  className="object-cover"
                  style={{ objectPosition: item.position }}
                />
                <span className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full bg-cream text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100 md:right-5 md:bottom-5">
                  <Arrow className="size-4" />
                </span>
              </button>
            </PhotoReveal>
            <figcaption
              data-photo-caption
              className="mt-4 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1.5"
            >
              <h3 className="text-[1.125rem] leading-snug tracking-[-0.03em] md:text-[1.5rem]">
                {item.title}
              </h3>
              <p className="text-[0.75rem] leading-relaxed text-gold">
                {item.service}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      {selected && (
        <PortfolioGallery
          looks={looks}
          selection={selected}
          onClose={closeGallery}
        />
      )}
    </section>
  );
}
