import { salon } from "@/lib/salon";
import { Logo } from "../ui/Logo";
import { Arrow } from "../ui/Icon";

export function Footer() {
  return (
    <footer className="page-padding bg-ink pb-7 text-cream md:pb-9">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 pt-2">
        <a href="#acasa" aria-label="FASON — Acasă">
          <Logo decorative className="h-auto w-[124px] md:w-[140px]" />
        </a>
        <p className="text-[11px] text-cream/60">Tuns. Culoare. Styling.</p>
        <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[11px] text-cream/60 md:w-auto md:justify-start">
          {salon.instagramUrl && (
            <a
              href={salon.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          )}
          <span>© {new Date().getFullYear()} FASON</span>
          <a
            href="#acasa"
            aria-label="Înapoi sus"
            className="group flex min-h-11 max-w-full flex-wrap items-center justify-center gap-3 text-cream/70 transition-colors duration-300 hover:text-cream"
          >
            <span className="min-w-0">Înapoi sus</span>
            <Arrow className="size-4 shrink-0 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </footer>
  );
}
