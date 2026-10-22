"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { navigation } from "@/lib/salon";
import { ActionLink } from "../ui/Action";
import { MenuToggle } from "../ui/MenuToggle";
import { Logo } from "../ui/Logo";

const MobileMenu = dynamic(
  () => import("./MobileMenu").then((module) => module.MobileMenu),
  { ssr: false },
);
const warmMenu = () => {
  void import("./MobileMenu").catch(() => {});
};

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("acasa");
    const sections = navigation.map((item) => ({
      href: item.href,
      element: document.querySelector<HTMLElement>(item.href),
    }));
    let frame = 0;

    const update = () => {
      frame = 0;
      if (window.innerWidth >= 1024) setMenuOpen(false);
      // Switch surfaces as the header leaves the photograph, including after
      // an anchor jump or a viewport resize.
      const pastHero = !!hero && hero.getBoundingClientRect().bottom <= 110;
      setScrolled(pastHero);
      let current: string | null = null;
      if (pastHero) {
        const readingLine = Math.min(window.innerHeight * 0.3, 220);
        for (const section of sections) {
          if (
            section.element &&
            section.element.getBoundingClientRect().top <= readingLine
          )
            current = section.href;
        }
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
        )
          current =
            sections.findLast((section) => section.element)?.href ?? current;
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Escape can arrive while the menu's module is still loading. Cancel that
    // pending opening; an already open dialog keeps its animated close handler.
    const cancelPendingMenu = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !document.querySelector("#mobile-menu[open]")
      )
        setMenuOpen(false);
    };

    scheduleUpdate();
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    if (hero) resizeObserver.observe(hero);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("keydown", cancelPendingMenu);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("keydown", cancelPendingMenu);
    };
  }, []);

  return (
    <>
      <header
        data-surface={scrolled ? "page" : "hero"}
        className={`site-nav fixed inset-x-3 top-3 z-40 grid grid-cols-[1fr_auto] items-center gap-[20px] rounded-lg border border-transparent px-[20px] transition-[height,background-color,color,border-color,box-shadow] duration-500 md:inset-x-5 md:top-5 md:px-8 lg:grid-cols-[1fr_auto_1fr] ${scrolled ? "h-16 border-ink/10 bg-cream/95 text-ink shadow-[0_4px_24px_-12px_rgba(33,29,27,0.2)] backdrop-blur-xl" : "h-[76px] bg-transparent text-cream"}`}
      >
        <a
          href="#acasa"
          aria-label="FASON — Acasă"
          className="flex w-fit items-center gap-4"
        >
          <Logo
            dark={scrolled}
            decorative
            className="h-auto w-[124px] shrink-0 md:w-[140px]"
          />
          <span className="hidden border-l border-current/25 pl-4 text-[9px] leading-[1.6] tracking-[0.08em] uppercase xl:block">
            Salon de coafură
            <br />
            București
          </span>
        </a>
        <nav
          aria-label="Navigare principală"
          className="hidden items-center gap-6 lg:flex xl:gap-7"
        >
          {navigation.map((item) => (
            <a
              className="nav-link flex min-h-11 items-center text-[12px] font-medium tracking-[-0.02em] opacity-100 xl:text-[13px]"
              key={item.href}
              href={item.href}
              aria-current={
                activeSection === item.href ? "location" : undefined
              }
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-self-end gap-5 lg:gap-0">
          <ActionLink
            href="#programari"
            variant="text"
            tone={scrolled ? "dark" : "light"}
            className="max-lg:hidden"
          >
            Programări
          </ActionLink>
          <MenuToggle
            onPointerEnter={warmMenu}
            onPointerDown={warmMenu}
            onFocus={warmMenu}
            onClick={() => setMenuOpen((open) => !open)}
            expanded={menuOpen}
            className="lg:hidden"
          />
        </div>
      </header>
      {menuOpen && (
        <MobileMenu
          open={menuOpen}
          compact={scrolled}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
