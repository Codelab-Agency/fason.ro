import { test, expect } from "@playwright/test";
import { formatServicePrice } from "../src/lib/pricing";

test("tariffs distinguish starting prices, fixed fees and missing values", () => {
  expect(formatServicePrice({ amount: 180, kind: "from" })).toBe(
    "de la 180 lei",
  );
  expect(formatServicePrice({ amount: 75, kind: "fixed" })).toBe("75 lei");
  expect(formatServicePrice({ amount: 0, kind: "fixed" })).toBe("0 lei");
  expect(formatServicePrice(null)).toBeNull();
  expect(formatServicePrice({ amount: -1, kind: "fixed" })).toBeNull();
  expect(formatServicePrice({ amount: Infinity, kind: "from" })).toBeNull();
});

test("the client brief shows all services, the founder and both team destinations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const services = page.locator("#servicii");
  await expect(services.locator("article")).toHaveCount(6);
  await expect(
    services.getByRole("link", { name: "Tuns damă & barber", exact: true }),
  ).toBeVisible();
  await expect(
    services.getByRole("link", { name: "Tratamente corporale", exact: true }),
  ).toBeVisible();
  await expect(page.locator("#cristina")).toContainText(
    "Fondatoare & Creative Director",
  );
  await expect(page.locator("#echipa a[href^='/echipa/']")).toHaveCount(2);
  await page
    .getByRole("link", { name: "Descoperă echipa Coafor & Barber" })
    .click();
  await expect(page).toHaveURL(/\/echipa\/coafor-barber$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Coafor & Barber" }),
  ).toBeVisible();
  await expect(page.locator(".site-nav")).toHaveAttribute(
    "data-surface",
    "page",
  );
  await expect(page.locator("[data-team-member]")).toHaveCount(1);
  await page
    .getByRole("navigation", { name: "Specializările echipei" })
    .getByRole("link", { name: "Beauty", exact: true })
    .click();
  await expect(page).toHaveURL(/\/echipa\/beauty$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Beauty" }),
  ).toBeVisible();
  await expect(page.locator("[data-team-member]")).toHaveCount(0);
  await page.getByRole("link", { name: "Înapoi la FASON" }).click();
  await expect(page).toHaveURL(/\/#echipa$/);
  await page.setViewportSize({ width: 320, height: 568 });
  await expect(page.locator("#despre")).toHaveCount(1);
  await expect(
    page.locator('a[href^="tel:"], a[href^="https://wa.me/"]'),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
