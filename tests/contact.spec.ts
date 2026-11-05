import { expect, test } from "@playwright/test";
import {
  getContactEmailHref,
  getPhoneHref,
  getWhatsAppHref,
} from "../src/lib/contact";

test("contact links preserve international numbers and encode the selected service", () => {
  const number = "+40 (712) 345-678";
  expect(getPhoneHref(number)).toBe("tel:+40712345678");
  const whatsapp = new URL(getWhatsAppHref(number, "Culoare & balayage")!);
  expect(whatsapp.origin).toBe("https://wa.me");
  expect(whatsapp.pathname).toBe("/40712345678");
  expect(whatsapp.searchParams.get("text")).toBe(
    "Bună! Mă interesează Culoare & balayage. Aș vrea să discutăm despre o vizită la FASON.",
  );
  expect(new URL(getWhatsAppHref(number)!).searchParams.get("text")).toBe(
    "Bună! Aș vrea să discutăm despre o vizită la FASON.",
  );
});

test("missing or invalid contacts never produce fake actionable links", () => {
  for (const number of [
    null,
    "",
    "în curând",
    "javascript:alert(1)",
    "0123",
    "+40?712#345678",
  ]) {
    expect(getPhoneHref(number)).toBeNull();
    expect(getWhatsAppHref(number)).toBeNull();
  }
});

test("contact email drafts preserve the message without injecting mail headers", () => {
  const fields = {
    name: " Ana ",
    email: "ana@example.test",
    message: "Culoare & styling?\nAș vrea detalii. &bcc=someone@example.test",
  };
  const draft = new URL(getContactEmailHref("salon@example.test", fields)!);
  expect(decodeURIComponent(draft.pathname)).toBe("salon@example.test");
  expect(draft.searchParams.get("subject")).toBe("Mesaj de pe website FASON");
  expect(draft.searchParams.get("body")).toBe(
    `Nume: Ana\nE-mail: ana@example.test\n\n${fields.message}`,
  );
  expect(draft.searchParams.has("bcc")).toBe(false);
  for (const invalid of [
    null,
    "",
    "not-an-email",
    "salon@example.test\r\nbcc:other@example.test",
  ])
    expect(getContactEmailHref(invalid, fields)).toBeNull();
});
