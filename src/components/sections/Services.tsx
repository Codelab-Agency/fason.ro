import { pricesAreDemonstrative, salon, services } from "@/lib/salon";
import { getWhatsAppHref } from "@/lib/contact";
import { Arrow } from "../ui/Icon";
import { RevealWords } from "../effects/RevealWords";
import { SectionLabel } from "../ui/SectionLabel";
import { ServicePrice } from "../ui/ServicePrice";

const groups = [
  { title: "Formă & finisaj", ids: ["tunsoare", "styling", "eveniment"] },
  {
    title: "Culoare & îngrijire",
    ids: ["culoare", "tratament", "consultatie"],
  },
];

export function Services() {
  const hasWhatsApp = Boolean(getWhatsAppHref(salon.whatsappNumber));

  return (
    <section
      id="servicii"
      aria-labelledby="services-title"
      className="page-padding bg-cream pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
        <div className="min-w-0 md:col-span-8">
          <div data-reveal className="mb-6">
            <SectionLabel>Servicii & tarife</SectionLabel>
          </div>
          <h2
            id="services-title"
            data-scroll-title
            className="section-heading max-md:text-[clamp(1.75rem,8.8vw,2.4rem)]"
          >
            <RevealWords text="Tuns. Culoare." />{" "}
            <span className="section-emphasis text-accent">
              <RevealWords text="Styling." />
            </span>
          </h2>
        </div>
        <p
          data-reveal
          className="section-copy max-w-[280px] text-ink/65 md:col-span-4 md:justify-self-end"
        >
          O schimbare mică sau un look cu totul nou. Începem cu ce îți dorești
          tu.
        </p>
      </div>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 font-editorial text-[1.75rem] leading-[1.2] italic text-accent">
              {group.title}
            </h3>
            <div>
              {group.ids.map((id) => {
                const service = services.find((item) => item.id === id)!;
                return (
                  <article
                    key={service.id}
                    data-service-reveal
                    className="group/service relative min-w-0 border-b border-ink/15 first:border-t"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-2 py-6 sm:py-7 lg:min-h-[148px]">
                      <div className="min-w-0 flex-1 basis-[230px]">
                        <h4>
                          <a
                            href={
                              getWhatsAppHref(
                                salon.whatsappNumber,
                                service.subtitle,
                              ) ?? "#programari"
                            }
                            target={hasWhatsApp ? "_blank" : undefined}
                            rel={
                              hasWhatsApp ? "noopener noreferrer" : undefined
                            }
                            className="inline-flex min-h-11 max-w-full items-center gap-3 text-[1.25rem] leading-[1.2] font-medium tracking-[-0.04em] [overflow-wrap:anywhere] transition-colors duration-150 hover:text-accent focus-visible:text-accent sm:text-[1.5rem] xl:text-[1.75rem]"
                          >
                            <span className="min-w-0">{service.subtitle}</span>
                            <Arrow className="size-3 shrink-0 text-accent transition-transform duration-150 group-hover/service:-translate-y-0.5 group-hover/service:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
                          </a>
                        </h4>
                        <p className="mt-1 max-w-[42ch] text-[0.75rem] leading-[1.75] text-ink/65">
                          {service.summary}
                        </p>
                      </div>
                      <ServicePrice price={service.price} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-[620px] text-[0.75rem] leading-[1.75] text-ink/65">
        {pricesAreDemonstrative
          ? "Tarife demonstrative, pentru prezentarea designului. Lista finală de prețuri va fi confirmată de salon."
          : "Pentru serviciile cu preț de pornire, tariful final se stabilește după lungimea părului și tehnica aleasă, înainte de începerea serviciului."}
      </p>
    </section>
  );
}
