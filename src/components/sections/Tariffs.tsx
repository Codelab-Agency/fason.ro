import {
  tariffCategories,
  tariffYear,
  type TariffCategory,
} from "@/lib/tariffs";
import { ActionLink } from "../ui/Action";
import { Arrow } from "../ui/Icon";
import { SectionLabel } from "../ui/SectionLabel";

function TariffSection({ category }: { category: TariffCategory }) {
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="grid gap-9 border-t border-ink/25 py-12 md:py-16 lg:grid-cols-12 lg:gap-12"
    >
      <div className="min-w-0 lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p className="mb-3 text-[0.8125rem] text-accent">{category.family}</p>
          <h2
            id={`${category.id}-heading`}
            className="text-[clamp(1.5rem,2.2vw,2.125rem)] leading-[1.2] tracking-[-0.04em] wrap-anywhere"
          >
            {category.title}
          </h2>
          <a
            href="#categorii"
            className="mt-5 inline-flex min-h-11 items-center gap-3 text-[0.8125rem] underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            Înapoi la categorii <Arrow className="size-3 -rotate-45" />
          </a>
        </div>
      </div>
      <div className="min-w-0 space-y-12 lg:col-span-8">
        {category.groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-[1.25rem] leading-[1.3] font-medium tracking-[-0.025em]">
              {group.title}
            </h3>
            {group.note && (
              <p className="mt-3 max-w-[62ch] text-[0.875rem] leading-[1.75] text-ink/70">
                {group.note}
              </p>
            )}
            <dl className="mt-5 divide-y divide-ink/15">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  data-tariff
                  className="flex flex-wrap items-baseline gap-x-5 gap-y-2 py-5"
                >
                  <dt className="min-w-0 flex-[1_1_10rem] text-[1rem] leading-[1.5] tracking-[-0.015em] wrap-anywhere">
                    {item.name}
                    {item.duration && (
                      <span className="mt-1.5 block text-[0.8125rem] leading-[1.5] tracking-normal text-ink/65">
                        {item.duration}
                      </span>
                    )}
                  </dt>
                  <dd className="ml-auto shrink-0 text-right text-[0.9375rem] leading-[1.6] font-medium whitespace-nowrap text-accent tabular-nums">
                    {item.price}
                  </dd>
                  {item.detail && (
                    <dd className="max-w-[60ch] basis-full text-[0.8125rem] leading-[1.75] text-ink/70">
                      {item.detail}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Tariffs() {
  return (
    <main
      id="continut"
      className="page-padding bg-cream pt-32 pb-16 md:pt-44 md:pb-24"
    >
      <div className="mb-12 grid gap-7 md:mb-16 md:grid-cols-12 md:items-end">
        <div className="min-w-0 md:col-span-7">
          <SectionLabel className="mb-6">Servicii & tarife</SectionLabel>
          <h1 className="text-[clamp(2.5rem,7.5vw,7.5rem)] leading-[1.12] font-medium tracking-[-0.055em] wrap-anywhere">
            Tarife{" "}
            <span className="font-editorial font-normal italic text-accent">
              {tariffYear}.
            </span>
          </h1>
        </div>
        <div className="min-w-0 md:col-span-5 md:pb-2">
          <p className="max-w-[45ch] text-[1rem] leading-[1.75] text-ink/75">
            Alege categoria și descoperă serviciile FASON, cu tarifele și
            duratele lor.
          </p>
          <p className="mt-3 max-w-[52ch] text-[0.875rem] leading-[1.75] text-ink/65">
            Pentru coafor, manopera, spălatul și materialele sunt afișate
            separat. Suplimentele și condițiile abonamentelor sunt precizate în
            listă.
          </p>
        </div>
      </div>
      <nav
        id="categorii"
        aria-label="Categorii de tarife"
        className="mb-10 grid scroll-mt-28 grid-cols-2 gap-x-6 md:mb-16 md:grid-cols-3 md:gap-x-12"
      >
        {tariffCategories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="group flex min-w-0 items-center justify-between gap-3 border-t border-ink/20 py-5 text-[0.875rem] leading-[1.5] hover:text-accent"
          >
            <span>{category.title}</span>
            <Arrow className="size-3 shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </a>
        ))}
      </nav>
      {tariffCategories.map((category) => (
        <TariffSection key={category.id} category={category} />
      ))}
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-ink/25 pt-8">
        <p className="max-w-[40ch] text-[0.9375rem] leading-[1.7] text-ink/70">
          Discutăm în salon despre serviciile potrivite pentru tine.
        </p>
        <ActionLink href="/#contact">Contact FASON</ActionLink>
      </div>
    </main>
  );
}
