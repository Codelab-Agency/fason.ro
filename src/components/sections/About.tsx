import Image from "next/image";
import { SectionLabel } from "../ui/SectionLabel";
import { ActionLink } from "../ui/Action";
import { PhotoReveal } from "../effects/PhotoReveal";

const story =
  "FASON este mai mult decât un studio de hairstyling. Este locul în care tehnica întâlnește creativitatea, iar frumusețea este privită din perspectiva fiecărei persoane.";
const words = story.split(" ");

export function About() {
  return (
    <section
      id="despre"
      aria-labelledby="about-heading"
      className="page-padding section-space bg-cream"
    >
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-20">
        <div className="min-w-0 md:col-span-7">
          <h2 id="about-heading" className="mb-6">
            <SectionLabel as="span">Povestea FASON</SectionLabel>
          </h2>
          <p
            data-ink-story
            className="max-w-[31ch] text-[clamp(1.4rem,2.5vw,2.5rem)] leading-[1.4] tracking-[-0.035em] [overflow-wrap:anywhere]"
          >
            {words.slice(0, -2).map((word, index) => (
              <span key={index}>
                <span data-ink-word>{word}</span>{" "}
              </span>
            ))}
            <span className="inline-block max-w-full">
              {words.slice(-2).map((word, index) => (
                <span key={index}>
                  <span data-ink-word>{word}</span>
                  {index === 0 ? " " : null}
                </span>
              ))}
            </span>
          </p>
          <p
            data-reveal
            className="mt-6 max-w-[56ch] text-[1rem] leading-[1.8] text-ink/75"
          >
            Sub direcția creativă a Cristinei Gramma, FASON reunește experiență,
            viziune și pasiunea pentru arta hairstylingului, într-o abordare în
            care fiecare detaliu contează.
          </p>
          <ActionLink href="#portofoliu" className="mt-6 md:mt-8">
            Descoperă lucrările FASON
          </ActionLink>
        </div>
        <figure className="min-w-0 md:col-span-5">
          <PhotoReveal className="relative aspect-[0.8] overflow-hidden bg-sand">
            <Image
              src="/images/craft.jpg"
              alt="Un stilist FASON lucrează la forma unei coafuri"
              fill
              sizes="(max-width: 767px) calc(400vw - 192px), 160vw"
              className="origin-left scale-[1.04] object-cover object-left"
            />
          </PhotoReveal>
          <figcaption
            data-photo-caption
            className="mt-3 text-[0.8125rem] text-ink/70"
          >
            Tehnică, creativitate și atenție la detalii.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
