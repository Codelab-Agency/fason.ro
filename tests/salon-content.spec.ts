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

test("sample tariffs are labeled and the full team stays visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const services = page.locator("#servicii");
  await expect(services.locator("article")).toHaveCount(6);
  await expect(
    services.getByText("de la 180 lei", { exact: true }),
  ).toBeVisible();
  await expect(services.getByText("75 lei", { exact: true })).toBeVisible();
  await expect(services).toContainText("Tarife demonstrative");
  const people = page.locator("[data-team-member]");
  await expect(people).toHaveCount(3);
  for (const person of await people.all()) {
    await person.scrollIntoViewIfNeeded();
    await expect(person.locator("h3")).toBeVisible();
    await expect
      .poll(() =>
        person
          .locator("img")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
  }
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
