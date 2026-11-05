import Image from "next/image";
import { founder } from "@/lib/salon";
import { PhotoReveal } from "../effects/PhotoReveal";
import { RevealWords } from "../effects/RevealWords";

export function Founder() {
  return (
    <section
      id="cristina"
      aria-labelledby="founder-heading"
      className="page-padding section-space bg-sand"
    >
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
        <figure data-team-member="cristina" className="min-w-0 md:col-span-5">
          <PhotoReveal className="relative aspect-[0.8] overflow-hidden bg-ink/10">
            <Image
              src={founder.image}
              alt="Cristina Gramma, fondatoarea și directorul creativ FASON"
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), 42vw"
              className="object-cover"
              style={{ objectPosition: founder.imagePosition }}
            />
          </PhotoReveal>
          <figcaption className="mt-4 text-[12px] text-ink/70">
            {founder.role}
          </figcaption>
        </figure>
        <div className="min-w-0 md:col-span-7 md:pt-4 lg:pt-10">
          <h2
            id="founder-heading"
            data-scroll-title
            className="section-heading max-sm:text-[clamp(1.75rem,8.6vw,2.4rem)]"
          >
            <RevealWords text="Cristina" />{" "}
            <span className="section-emphasis text-accent">
              <RevealWords text="Gramma." />
            </span>
          </h2>
          <p
            data-reveal
            className="mt-7 max-w-[30ch] font-editorial text-[clamp(1.65rem,3vw,2.75rem)] leading-[1.2] text-accent"
          >
            {founder.introduction.replace(/ (\S+)$/, "\u00a0$1")}
          </p>
          <div className="mt-7 space-y-5">
            {founder.biography.map((paragraph) => (
              <p
                data-reveal
                key={paragraph}
                className="max-w-[58ch] text-[15px] leading-[1.85] text-ink/75"
              >
                {paragraph.replace(/ (\S+)$/, "\u00a0$1")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
