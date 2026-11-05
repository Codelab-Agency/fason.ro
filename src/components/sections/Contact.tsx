import Image from "next/image";
import { salon, socialLinks } from "@/lib/salon";
import { ActionLink } from "../ui/Action";
import { PhotoReveal } from "../effects/PhotoReveal";
import { RevealWords } from "../effects/RevealWords";
import { SectionLabel } from "../ui/SectionLabel";
import { ContactMethods } from "../ui/ContactMethods";
import { ContactForm } from "../ui/ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="overflow-hidden bg-ink pt-20 pb-8 text-cream md:pt-28 md:pb-10"
    >
      <span id="programari" aria-hidden="true" className="block scroll-mt-28" />
      <div className="grid items-center md:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10 px-6 pb-12 sm:px-10 md:pr-6 md:pb-16 lg:pl-18 xl:pl-24">
          <div data-reveal className="mb-6">
            <SectionLabel dark>Contact</SectionLabel>
          </div>
          <h2
            data-scroll-title
            className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-medium tracking-[-0.055em] [word-spacing:0.03em]"
          >
            <span className="block">
              <RevealWords text="Ne găsești" />
            </span>{" "}
            <span className="section-emphasis block text-gold">
              <RevealWords text="la FASON." />
            </span>
          </h2>
          <div data-reveal className="mt-6">
            <p className="section-copy max-w-[310px] text-cream/75">
              Pentru o programare sau o întrebare, ne auzim la telefon ori pe
              WhatsApp.
            </p>
            <div className="mt-8">
              <ContactMethods dark compact />
            </div>
          </div>
        </div>
        {salon.email ? (
          <div className="px-6 pb-12 sm:px-10 md:pl-6 md:pr-10 lg:pr-18 xl:pr-24">
            <ContactForm email={salon.email} />
          </div>
        ) : (
          <figure className="hidden w-full max-w-[640px] justify-self-end self-end md:block">
            <PhotoReveal className="relative aspect-[1.05] overflow-hidden md:aspect-[0.95]">
              <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
                <Image
                  src="/images/styling-cutout-matte.webp"
                  alt="Mâinile stilistului modelează o coafură sculpturală FASON"
                  fill
                  unoptimized
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </PhotoReveal>
          </figure>
        )}
      </div>
      <div className="page-padding">
        <div className="flex flex-col justify-between gap-3 border-t border-cream/15 pt-6 md:flex-row md:items-center md:gap-10">
          <ActionLink href="#locatie" tone="light" className="self-start">
            {salon.address}
          </ActionLink>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[12px] text-cream/65">
            {salon.email && (
              <a
                href={`mailto:${salon.email}`}
                className="inline-flex min-h-11 items-center"
              >
                {salon.email}
              </a>
            )}
            <p>{salon.hours ?? salon.city}</p>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
