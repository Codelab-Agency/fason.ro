"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { navigation, salon } from "@/lib/salon";
import { Arrow } from "../ui/Icon";
import { ActionLink } from "../ui/Action";
import { MenuToggle } from "../ui/MenuToggle";
import { Logo } from "../ui/Logo";

export function MobileMenu({
  open,
  compact,
  onClose,
}: {
  open: boolean;
  compact: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const afterClose = useRef<(() => void) | null>(null);
  const callbacks = useRef({ onClose });

  useEffect(() => {
    callbacks.current = { onClose };
  }, [onClose]);

  const dismiss = useCallback((action?: () => void) => {
    const element = dialog.current;
    if (!element?.open || closing.current) return;
    closing.current = true;
    afterClose.current = action ?? null;
    animation.current?.kill();
    const finish = () => callbacks.current.onClose();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    animation.current = gsap
      .timeline({ onComplete: finish })
      .to(
        element.querySelector('[data-menu-toggle-line="top"]'),
        {
          attr: { x1: 3, y1: 8, x2: 21, y2: 8 },
          duration: 0.4,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        element.querySelector('[data-menu-toggle-line="bottom"]'),
        {
          attr: { x1: 9, y1: 16, x2: 21, y2: 16 },
          duration: 0.4,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        element.querySelectorAll(
          "[data-menu-word], [data-menu-detail], [data-menu-footer]",
        ),
        {
          opacity: 0,
          y: -8,
          duration: 0.2,
          ease: "power2.in",
        },
        0,
      );
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) return;
    // A lazy-mounted menu also mounts in React Strict Mode. Start the native
    // modal once on the next frame, after the provisional effect is cleaned up.
    let cleanup: (() => void) | undefined;
    const frame = requestAnimationFrame(() => {
      closing.current = false;
      const focusBefore =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      const previousBodyOverflow = document.body.style.overflow;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.dispatchEvent(
        new CustomEvent("fason:dialog", { detail: { open: true } }),
      );
      element.showModal();
      closeButton.current?.focus({ preventScroll: true });

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const context = gsap.context(() => {
        gsap.set("[data-menu-content]", { opacity: 1, y: 0 });
        gsap.set("[data-menu-word], [data-menu-detail], [data-menu-footer]", {
          clearProps: "opacity,transform",
        });
        const topLine = element.querySelector('[data-menu-toggle-line="top"]');
        const bottomLine = element.querySelector(
          '[data-menu-toggle-line="bottom"]',
        );
        if (reduced) {
          gsap.set(topLine, { attr: { x1: 5, y1: 5, x2: 19, y2: 19 } });
          gsap.set(bottomLine, { attr: { x1: 5, y1: 19, x2: 19, y2: 5 } });
          return;
        }
        animation.current = gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            topLine,
            {
              attr: { x1: 3, y1: 8, x2: 21, y2: 8 },
            },
            {
              attr: { x1: 5, y1: 5, x2: 19, y2: 19 },
              duration: 0.45,
              ease: "power3.inOut",
            },
            0,
          )
          .fromTo(
            bottomLine,
            {
              attr: { x1: 9, y1: 16, x2: 21, y2: 16 },
            },
            {
              attr: { x1: 5, y1: 19, x2: 19, y2: 5 },
              duration: 0.45,
              ease: "power3.inOut",
            },
            0,
          )
          .from(
            "[data-menu-word]",
            { yPercent: 115, rotate: 5, duration: 0.8, stagger: 0.055 },
            0.05,
          )
          .from(
            "[data-menu-detail]",
            { opacity: 0, duration: 0.6, stagger: 0.05 },
            0.2,
          )
          .from(
            "[data-menu-footer]",
            { y: 16, opacity: 0, duration: 0.6 },
            0.3,
          );
      }, element);

      const desktop = window.matchMedia("(min-width: 1024px)");
      const onDesktop = () => {
        if (desktop.matches) dismiss();
      };
      desktop.addEventListener("change", onDesktop);
      cleanup = () => {
        animation.current?.kill();
        context.revert();
        desktop.removeEventListener("change", onDesktop);
        element.close();
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
        window.dispatchEvent(
          new CustomEvent("fason:dialog", { detail: { open: false } }),
        );
        focusBefore?.focus({ preventScroll: true });
        const action = afterClose.current;
        afterClose.current = null;
        if (action) requestAnimationFrame(action);
      };
    });
    return () => {
      cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [open, dismiss]);

  function navigate(href: string) {
    dismiss(() => {
      history.pushState(null, "", href);
      const unhandled = window.dispatchEvent(
        new CustomEvent("fason:navigate", {
          detail: { href },
          cancelable: true,
        }),
      );
      if (unhandled)
        document.querySelector(href)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        });
    });
  }

  return (
    <dialog
      ref={dialog}
      id="mobile-menu"
      aria-label="Meniu principal"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-cream p-0 text-ink outline-none"
      data-lenis-prevent
    >
      <div className="absolute inset-0 overflow-hidden bg-cream">
        <div
          data-menu-photo
          aria-hidden="true"
          className="pointer-events-none absolute top-[16%] -right-[24%] h-[65%] w-[72%] -rotate-12 opacity-[0.14] sm:-right-[10%] sm:w-[48%] [@media(max-height:500px)]:hidden"
        >
          <Image
            src="/images/hero-portrait.jpg"
            alt=""
            fill
            sizes="70vw"
            className="object-cover object-[50%_45%] grayscale mix-blend-multiply"
          />
        </div>
      </div>

      <div
        data-menu-content
        className="relative flex h-full min-h-0 flex-col px-6 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-10 md:pt-5 [@media(max-height:500px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div
          data-menu-top
          className={`-mx-3 flex shrink-0 items-center justify-between border border-transparent px-[20px] sm:-mx-7 md:-mx-5 md:px-8 ${compact ? "h-16" : "h-[76px]"}`}
        >
          <a
            href="#acasa"
            aria-label="FASON — Acasă"
            onClick={(event) => {
              event.preventDefault();
              navigate("#acasa");
            }}
          >
            <Logo dark decorative className="h-auto w-[124px] md:w-[140px]" />
          </a>
          <MenuToggle ref={closeButton} expanded onClick={() => dismiss()} />
        </div>

        <div
          data-menu-detail
          className="mt-5 mb-3 flex shrink-0 items-center justify-between border-t border-ink/20 pt-4 text-[8px] tracking-[0.15em] uppercase [@media(max-height:650px)]:hidden"
        >
          <span>Un look. O atitudine.</span>
          <span>București, RO</span>
        </div>

        <nav
          aria-label="Navigare mobilă"
          className="my-3 grid min-h-0 flex-1 grid-rows-6 [container-type:size] [@media(max-height:500px)]:my-2 [@media(max-height:500px)_and_(min-width:500px)]:grid-cols-2 [@media(max-height:500px)_and_(min-width:500px)]:grid-rows-3 [@media(max-height:500px)_and_(min-width:500px)]:gap-x-10"
        >
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                navigate(item.href);
              }}
              className="group flex min-h-0 items-center gap-3 border-b border-ink/15 focus-visible:outline-offset-0"
            >
              <span className="block overflow-hidden py-1">
                <span
                  data-menu-word
                  className={`block origin-bottom-left text-[clamp(1.25rem,min(12cqh,14vw),5.25rem)] leading-[1.05] tracking-[-0.065em] transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent [@media(max-height:500px)_and_(min-width:500px)]:text-[clamp(1.5rem,8.8dvh,2.75rem)] ${index % 2 ? "font-editorial italic tracking-[-0.045em]" : "font-medium"}`}
                >
                  {item.label}
                </span>
              </span>
              <Arrow
                data-menu-detail
                className="ml-auto size-5 shrink-0 text-ink/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          ))}
        </nav>

        <div
          data-menu-footer
          className="shrink-0 pt-4 [@media(max-height:500px)]:pt-1"
        >
          <ActionLink
            href="#programari"
            variant="solid"
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              event.preventDefault();
              navigate("#programari");
            }}
            className="w-full [@media(max-height:500px)]:min-h-11 [@media(max-height:500px)]:py-2"
          >
            Vorbește cu noi
          </ActionLink>
          <div className="mt-4 flex items-center justify-between gap-3 text-[9px] text-ink/65 [@media(max-height:500px)]:mt-2">
            <span>{salon.address}</span>
            <span>Creative hair studio</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
