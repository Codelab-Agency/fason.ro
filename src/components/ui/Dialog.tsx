"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Close } from "./Icon";

export function Dialog({
  open,
  onClose,
  title,
  children,
  dark = false,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  dark?: boolean;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent("fason:dialog", { detail: { open: true } }),
    );
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(
        new CustomEvent("fason:dialog", { detail: { open: false } }),
      );
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fason-dialog m-auto max-h-[90svh] w-[calc(100%-32px)] overflow-y-auto rounded-lg p-0 ${wide ? "max-w-4xl" : "max-w-2xl"} ${dark ? "bg-ink text-cream" : "bg-cream text-ink"}`}
      data-lenis-prevent
    >
      <div className="relative p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Închide"
          className={`absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-current/20 transition-colors duration-300 ${dark ? "bg-ink/90 hover:bg-cream/15" : "bg-cream/90 hover:bg-sand"}`}
        >
          <Close />
        </button>
        {open && children}
      </div>
    </dialog>
  );
}
