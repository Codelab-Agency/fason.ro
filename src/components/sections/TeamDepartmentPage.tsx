import Link from "next/link";
import { services, teamDepartments, teamMembers } from "@/lib/salon";
import { MotionProvider } from "../effects/MotionProvider";
import { ActionLink } from "../ui/Action";
import { SectionLabel } from "../ui/SectionLabel";
import { TeamMemberCard } from "../ui/TeamMemberCard";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export function TeamDepartmentPage({
  departmentId,
}: {
  departmentId: "coafor-barber" | "beauty";
}) {
  const department = teamDepartments.find((item) => item.id === departmentId)!;
  const members = teamMembers.filter(
    (member) => member.departmentId === departmentId,
  );
  const serviceIds = new Set<string>(department.serviceIds);
  return (
    <MotionProvider>
      <Navigation onHomePage={false} />
      <main id="continut">
        <section
          className="page-padding bg-cream pt-36 pb-20 md:pt-44 md:pb-28"
          aria-labelledby="department-heading"
        >
          <ActionLink href="/#echipa" className="mb-12">
            Înapoi la FASON
          </ActionLink>
          <div className="grid gap-7 md:grid-cols-12 md:items-end">
            <div className="min-w-0 md:col-span-8">
              <SectionLabel className="mb-6">Echipa FASON</SectionLabel>
              <h1
                id="department-heading"
                className="text-[clamp(2.6rem,7vw,7rem)] leading-[1.05] font-medium tracking-[-0.06em] text-balance max-sm:text-[clamp(2rem,9.4vw,2.6rem)]"
              >
                {department.title}
              </h1>
            </div>
            <p className="max-w-[34ch] text-[15px] leading-[1.85] text-ink/70 md:col-span-4">
              {department.description.replace(/ (\S+)$/, "\u00a0$1")}
            </p>
          </div>
          <nav
            aria-label="Specializările echipei"
            className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/20 pb-5"
          >
            {teamDepartments.map((item) => (
              <Link
                key={item.id}
                href={`/echipa/${item.id}`}
                aria-current={item.id === departmentId ? "page" : undefined}
                className={`inline-flex min-h-11 items-center text-sm ${item.id === departmentId ? "text-ink underline underline-offset-8" : "text-ink/65 hover:text-accent"}`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          {members.length > 0 && (
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
          <div className="mt-14 grid gap-7 border-t border-ink/20 pt-8 md:grid-cols-2 md:gap-16">
            <div className="min-w-0">
              <h2 className="text-[1.75rem] leading-[1.2] tracking-[-0.04em] wrap-anywhere">
                Specializările din studio
              </h2>
              <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.85] text-ink/70">
                Consultanță, atenție la detalii și recomandări personalizate.
                Alegem împreună ce ți se potrivește.
              </p>
            </div>
            <ul className="min-w-0 divide-y divide-ink/15">
              {services
                .filter((service) => serviceIds.has(service.id))
                .map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/preturi#${service.id}`}
                      className="flex min-h-14 items-center py-3 text-lg tracking-[-0.035em] hover:text-accent"
                    >
                      {service.subtitle}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <ActionLink href="/#contact" className="mt-10">
            Ne cunoaștem în salon
          </ActionLink>
        </section>
      </main>
      <Footer homePrefix="/" />
    </MotionProvider>
  );
}
