import Link from "next/link";
import { teamDepartments } from "@/lib/salon";
import { RevealWords } from "../effects/RevealWords";
import { SectionLabel } from "../ui/SectionLabel";
import { Arrow } from "../ui/Icon";

export function Team() {
  return (
    <section
      id="echipa"
      aria-labelledby="team-title"
      className="page-padding section-space bg-cream"
    >
      <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
        <div className="min-w-0 md:col-span-8">
          <div data-reveal className="mb-6">
            <SectionLabel>Echipa FASON</SectionLabel>
          </div>
          <h2
            id="team-title"
            data-scroll-title
            className="text-[clamp(2.4rem,5.4vw,5.5rem)] leading-[1.08] font-medium tracking-[-0.055em] [word-spacing:0.03em]"
          >
            <span className="block">
              <RevealWords text="Oamenii" />
            </span>{" "}
            <span className="section-emphasis block text-accent">
              <RevealWords text="de la FASON." />
            </span>
          </h2>
        </div>
        <p
          data-reveal
          className="section-copy max-w-[270px] text-ink/65 md:col-span-4 md:justify-self-end"
        >
          Specializări diferite, aceeași grijă pentru oameni.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 md:gap-14">
        {teamDepartments.map((department) => (
          <Link
            key={department.id}
            href={`/echipa/${department.id}`}
            prefetch={false}
            className="group min-w-0 border-t border-ink/20 py-8"
            aria-label={`Descoperă echipa ${department.title}`}
          >
            <h3 className="flex items-center justify-between gap-5 text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.15] tracking-[-0.055em]">
              <span>{department.title}</span>
              <Arrow className="size-6 shrink-0 text-accent transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none" />
            </h3>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.85] text-ink/70">
              {department.description.replace(/ (\S+)$/, "\u00a0$1")}
            </p>
            <span className="mt-6 inline-block text-[12px] text-accent">
              Descoperă echipa
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
