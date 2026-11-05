import Link from "next/link";
import { services } from "@/lib/salon";
import { Arrow } from "../ui/Icon";
import { RevealWords } from "../effects/RevealWords";
import { SectionLabel } from "../ui/SectionLabel";
import { ServicePrice } from "../ui/ServicePrice";
import { ActionLink } from "../ui/Action";

export function Services() {
  return (
    <section
      id="servicii"
      aria-labelledby="services-title"
      className="page-padding bg-cream pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
        <div className="min-w-0 md:col-span-8">
          <div data-reveal className="mb-6">
            <SectionLabel>Serviciile FASON</SectionLabel>
          </div>
          <h2
            id="services-title"
            data-scroll-title
            className="section-heading max-md:text-[clamp(1.75rem,8.8vw,2.4rem)]"
          >
            <RevealWords text="Hair &" />{" "}
            <span className="section-emphasis text-accent">
              <RevealWords text="Beauty." />
            </span>
          </h2>
        </div>
        <p
          data-reveal
          className="section-copy max-w-[280px] text-ink/65 md:col-span-4 md:justify-self-end"
        >
          Tehnică, creativitate și recomandări care pornesc de la tine.
        </p>
      </div>
      <div className="grid gap-x-12 md:grid-cols-2 lg:gap-x-20">
        {services.map((service) => (
          <article
            key={service.id}
            data-service-reveal
            className="group/service min-w-0 border-t border-ink/20"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 py-7 md:min-h-[136px] md:py-8">
              <div className="min-w-0 flex-1 basis-[230px]">
                <p className="mb-3 text-[12px] text-accent">{service.title}</p>
                <h3>
                  <Link
                    href={`/preturi#${service.id}`}
                    className="flex min-h-11 max-w-full items-center justify-between gap-4 text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.2] font-medium tracking-[-0.04em] transition-colors duration-150 hover:text-accent"
                  >
                    <span className="min-w-0">{service.subtitle}</span>
                    <Arrow className="size-3 shrink-0 text-accent transition-transform duration-150 group-hover/service:-translate-y-0.5 group-hover/service:translate-x-0.5 motion-reduce:transform-none" />
                  </Link>
                </h3>
                {service.summary && (
                  <p className="mt-3 max-w-[42ch] text-sm leading-[1.75] text-ink/65">
                    {service.summary}
                  </p>
                )}
              </div>
              {service.price && <ServicePrice price={service.price} />}
            </div>
          </article>
        ))}
      </div>
      <div
        data-reveal
        className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-ink/20 pt-6"
      >
        <p className="text-[0.875rem] text-ink/65">
          Lista completă de servicii și tarife pentru 2027.
        </p>
        <ActionLink href="/preturi">Vezi tarifele 2027</ActionLink>
      </div>
    </section>
  );
}
