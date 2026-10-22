import { teamMembers } from "@/lib/salon";
import { RevealWords } from "../effects/RevealWords";
import { SectionLabel } from "../ui/SectionLabel";
import { TeamMemberCard } from "../ui/TeamMemberCard";

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
          Stiluri diferite. Aceeași atenție la părul tău.
        </p>
      </div>
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-3 lg:gap-x-8">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
