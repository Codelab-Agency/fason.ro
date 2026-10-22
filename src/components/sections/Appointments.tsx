import { RevealWords } from "../effects/RevealWords";
import { ContactMethods } from "../ui/ContactMethods";
import { SectionLabel } from "../ui/SectionLabel";

export function Appointments() {
  return (
    <section
      id="programari"
      aria-label="Programări prin telefon și WhatsApp"
      className="page-padding bg-sand py-14 md:py-20"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-center">
        <div className="min-w-0 md:col-span-6">
          <div data-reveal className="mb-6">
            <SectionLabel>Programări</SectionLabel>
          </div>
          <h2
            data-scroll-title
            className="text-[clamp(1.8rem,8.5vw,4rem)] leading-[1.08] font-medium tracking-[-0.055em] md:text-[clamp(1.8rem,4.2vw,4rem)]"
          >
            <span className="block">
              <RevealWords text="Un nou look?" />
            </span>{" "}
            <span className="section-emphasis block text-accent">
              <RevealWords text="Hai să vorbim." />
            </span>
          </h2>
          <p
            data-reveal
            className="section-copy mt-6 max-w-[340px] text-ink/65"
          >
            Pentru o vizită la FASON, ne auzim la telefon sau pe WhatsApp.
            Alegem împreună momentul potrivit.
          </p>
        </div>
        <div className="min-w-0 border-t border-ink/20 pt-7 md:col-span-5 md:col-start-8 md:border-t-0 md:border-l md:py-3 md:pl-10">
          <ContactMethods />
        </div>
      </div>
    </section>
  );
}
