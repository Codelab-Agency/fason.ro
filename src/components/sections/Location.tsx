"use client";

import { useState } from "react";
import Image from "next/image";
import { salon, location } from "@/lib/salon";
import { ActionButton, ActionLink } from "../ui/Action";
import { Logo } from "../ui/Logo";
import { SectionLabel } from "../ui/SectionLabel";
import { Dialog } from "../ui/Dialog";
import { GoogleReviews } from "./GoogleReviews";

type LocationView = "map" | "facade";

export function Location() {
  const [view, setView] = useState<LocationView | null>(null);

  return (
    <section
      id="locatie"
      aria-label="Locația salonului FASON"
      className="overflow-hidden bg-cream pt-8 pb-20 md:pt-12 md:pb-28"
    >
      <div className="page-padding flex items-center justify-between gap-6 text-[11px] text-ink/65">
        <SectionLabel>Ne găsești aici</SectionLabel>
        <span>București · Sector 3</span>
      </div>
      <div className="relative mt-3 h-[430px] overflow-hidden sm:h-[520px] md:mt-5 md:h-[560px] lg:h-[65svh] lg:min-h-[540px] lg:max-h-[720px]">
        <div data-parallax="2" className="absolute -inset-y-[3%] inset-x-0">
          <button
            type="button"
            onClick={() => setView("map")}
            aria-label="Explorează harta FASON"
            aria-haspopup="dialog"
            className="group relative block h-full w-full focus-visible:outline-offset-[-12px]"
          >
            <Image
              src="/images/location-neighborhood.svg"
              alt="Planul străzilor din jurul FASON, cu Strada Baia de Fier și Piața Unirii"
              fill
              sizes="100vw"
              className="object-cover max-sm:scale-[1.35]"
            />
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-accent/30 bg-cream/90">
                <span className="size-2.5 rounded-full bg-accent" />
              </span>
              <span className="absolute bottom-11 left-1/2 -translate-x-1/2">
                <span className="block rounded-sm bg-cream px-3 py-3 ring-1 ring-ink/10 shadow-[0_3px_12px_-8px_rgba(33,29,27,0.45)]">
                  <Logo dark decorative className="block h-[25px] w-[122px]" />
                </span>
                <span className="absolute top-full left-1/2 h-3 w-px -translate-x-1/2 bg-accent/35" />
              </span>
            </span>
          </button>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#f5f2eb,transparent_15%,transparent_82%,#f5f2eb)]"
        />
        <ActionButton
          variant="text"
          onClick={() => setView("map")}
          aria-haspopup="dialog"
          className="absolute right-6 bottom-4 sm:right-10 lg:right-18 xl:right-24"
        >
          Deschide harta
        </ActionButton>
      </div>
      <div className="page-padding relative z-10 mt-5 md:mt-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start md:gap-10">
          <div>
            <h2
              data-reveal
              className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.15] tracking-[-0.04em]"
            >
              Strada Baia de Fier 10
            </h2>
            <p className="mt-3 text-[12px] leading-[1.8] text-ink/65">
              Piața Unirii · Intrarea dinspre Sfânta Vineri
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 md:gap-x-7">
            <ActionLink
              href={location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Traseu către FASON"
            >
              Traseu
            </ActionLink>
            <ActionButton
              variant="text"
              onClick={() => setView("facade")}
              aria-label="Vezi fațada"
              aria-haspopup="dialog"
            >
              Fațada
            </ActionButton>
            <GoogleReviews />
          </div>
        </div>
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-fit min-h-8 content-center text-[10px] text-ink/65 md:mt-5"
        >
          © OpenStreetMap contributors
        </a>
      </div>
      <Dialog
        open={view !== null}
        onClose={() => setView(null)}
        title={view === "facade" ? "Fațada salonului FASON" : "Locația FASON"}
        wide
      >
        <div className="pt-3">
          <SectionLabel className="mb-6">FASON · București</SectionLabel>
          <h3 className="pr-8 text-[30px] leading-tight tracking-[-0.045em]">
            Baia de Fier, 10.
          </h3>
          <div
            role="group"
            aria-label="Explorează locația"
            className="mt-5 mb-7 flex gap-6 border-b border-ink/15 text-[11px]"
          >
            {(
              [
                ["map", "Harta"],
                ["facade", "Fațada"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={view === value}
                onClick={() => setView(value)}
                className={`min-h-11 border-b pb-2 transition-colors ${view === value ? "border-ink text-ink" : "border-transparent text-ink/65 hover:text-ink"}`}
              >
                {label}
              </button>
            ))}
          </div>
          {view === "facade" ? (
            <figure className="mx-auto max-w-[400px]">
              <Image
                src={location.image}
                alt={location.imageAlt}
                width={512}
                height={682}
                sizes="(max-width: 575px) 80vw, 400px"
                className="h-auto w-full"
              />
              <figcaption className="mt-4 text-[10px] leading-[1.7] text-ink/65">
                <a
                  href={location.imageSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {location.imageSourceLabel}
                </a>
              </figcaption>
            </figure>
          ) : (
            <iframe
              src={location.mapEmbedUrl}
              title="Hartă interactivă — locația FASON"
              className="h-[50svh] min-h-[300px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
          <ActionLink
            href={location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6"
          >
            Deschide traseul în Google Maps
          </ActionLink>
          <p className="mt-2 text-[10px] text-ink/65">
            {salon.address} · {salon.city}
          </p>
        </div>
      </Dialog>
    </section>
  );
}
