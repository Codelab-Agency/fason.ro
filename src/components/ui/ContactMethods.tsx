import { salon } from "@/lib/salon";
import { getPhoneHref, getWhatsAppHref } from "@/lib/contact";
import { ActionLink } from "./Action";

export function ContactMethods({
  dark = false,
  compact = false,
}: {
  dark?: boolean;
  compact?: boolean;
}) {
  const phoneHref = getPhoneHref(salon.phone);
  const whatsappHref = getWhatsAppHref(salon.whatsappNumber);
  const tone = dark ? "light" : "dark";

  if (!phoneHref && !whatsappHref)
    return (
      <div>
        <p
          className={`${compact ? "text-[18px]" : "text-[clamp(1.5rem,3vw,2.75rem)]"} leading-snug tracking-[-0.035em] [overflow-wrap:anywhere] ${dark ? "text-gold" : "text-ink"}`}
        >
          Telefon &amp; WhatsApp
        </p>
        <p
          className={`mt-3 max-w-[290px] text-[13px] leading-[1.8] ${dark ? "text-cream/75" : "text-ink/65"}`}
        >
          Datele de contact vor fi disponibile în curând.
        </p>
        <ActionLink href="#locatie" tone={tone} className="mt-4">
          Vezi unde ne găsești
        </ActionLink>
      </div>
    );

  return (
    <div>
      {phoneHref && (
        <a
          href={phoneHref}
          className={`inline-flex max-w-full items-center py-2 leading-[1.15] tracking-[-0.045em] transition-colors [overflow-wrap:anywhere] ${compact ? "text-[clamp(1.7rem,3.2vw,3.5rem)]" : "text-[clamp(1.75rem,4vw,4.5rem)]"} ${dark ? "text-gold hover:text-cream focus-visible:outline-cream" : "text-ink hover:text-accent focus-visible:outline-accent"}`}
        >
          {salon.phone}
        </a>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
        {phoneHref && (
          <ActionLink href={phoneHref} variant="solid" tone={tone}>
            Sună-ne
          </ActionLink>
        )}
        {whatsappHref && (
          <ActionLink
            href={whatsappHref}
            variant={phoneHref ? "text" : "solid"}
            tone={tone}
            target="_blank"
            rel="noopener noreferrer"
          >
            Scrie pe WhatsApp
          </ActionLink>
        )}
      </div>
    </div>
  );
}
