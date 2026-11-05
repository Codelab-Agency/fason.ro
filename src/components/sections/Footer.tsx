import { socialLinks } from "@/lib/salon";
import { Logo } from "../ui/Logo";
import { Arrow } from "../ui/Icon";

export function Footer({ homePrefix = "" }: { homePrefix?: "" | "/" }) {
  return (
    <footer className="page-padding bg-ink pb-7 text-cream md:pb-9">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 pt-2">
        <a href={`${homePrefix}#acasa`} aria-label="FASON — Acasă">
          <Logo decorative className="h-auto w-[124px] md:w-[140px]" />
        </a>
        <p className="text-[11px] text-cream/60">
          Hair &amp; Beauty Salon · Cu drag de oameni
        </p>
        <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[11px] text-cream/60 md:w-auto md:justify-start">
          <Link
            href="/preturi"
            className="inline-flex min-h-11 items-center hover:text-cream"
          >
            Tarife 2027
          </Link>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
          <span>© {new Date().getFullYear()} FASON</span>
          <a
            href={`${homePrefix}#acasa`}
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
import Link from "next/link";
