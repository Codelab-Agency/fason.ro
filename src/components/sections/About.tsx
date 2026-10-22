import { SectionLabel } from "../ui/SectionLabel";
import { ActionLink } from "../ui/Action";

const story =
  "Tunsori, culoare și oameni. Într-un salon în care fiecare look începe cu o conversație.";
const words = story.split(" ");

export function About() {
  return (
    <section
      id="despre"
      aria-labelledby="about-heading"
      className="page-padding bg-cream pb-20 md:pb-28"
    >
      <div className="grid gap-8 border-t border-ink/20 pt-10 md:grid-cols-12 md:gap-10 md:pt-14">
        <div data-reveal className="md:col-span-3">
          <h2 id="about-heading" className="mb-6">
            <SectionLabel as="span">Despre salon</SectionLabel>
          </h2>
          <p className="max-w-[190px] text-[0.8125rem] leading-[1.8] text-ink/65">
            Un loc pentru părul tău.
            <br />
            Și pentru felul tău de a fi.
          </p>
        </div>
        <div className="min-w-0 md:col-span-8 md:col-start-5">
          <p
            data-ink-story
            className="text-[clamp(1.6rem,3.6vw,3.5rem)] leading-[1.25] tracking-[-0.045em] [overflow-wrap:anywhere]"
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
          <ActionLink href="#programari" className="mt-6 md:mt-8">
            Ne cunoaștem în salon
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
