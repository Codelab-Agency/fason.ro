"use client";

import { useState, type FormEvent } from "react";
import { getContactEmailHref } from "@/lib/contact";
import { ActionButton } from "./Action";

export function ContactForm({ email }: { email: string }) {
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const href = getContactEmailHref(email, {
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      message: String(values.get("message") ?? ""),
    });
    if (!href) {
      setNotice("Adresa de contact nu este disponibilă momentan.");
      return;
    }
    setNotice(
      "Mesajul se deschide în aplicația ta de e-mail. Îl poți trimite de acolo.",
    );
    window.location.assign(href);
  }
  const inputClass =
    "mt-2 min-h-12 w-full border-b border-cream/40 bg-transparent px-0 py-3 text-base text-cream focus-visible:outline-gold";
  return (
    <form
      onSubmit={submit}
      aria-label="Scrie-ne un mesaj"
      className="space-y-6"
    >
      <label className="block text-sm text-cream/80" htmlFor="contact-name">
        Numele tău
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          className={inputClass}
        />
      </label>
      <label className="block text-sm text-cream/80" htmlFor="contact-email">
        Adresa de e-mail
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className={inputClass}
        />
      </label>
      <label className="block text-sm text-cream/80" htmlFor="contact-message">
        Cu ce te putem ajuta?
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={2000}
          rows={4}
          className={`${inputClass} resize-y`}
        />
      </label>
      <ActionButton type="submit" tone="light">
        Continuă prin e-mail
      </ActionButton>
      <p className="text-[12px] leading-[1.8] text-cream/70">
        Formularul pregătește mesajul în aplicația ta de e-mail; trimiterea se
        face de acolo.
      </p>
      <p role="status" className="text-sm leading-[1.75] text-gold">
        {notice}
      </p>
    </form>
  );
}
