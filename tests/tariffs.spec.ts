import { test, expect } from "@playwright/test";

test("2027 tariffs keep services, labour, materials and packages distinct", async ({
  page,
}) => {
  await page.goto("/preturi");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Tarife 2027.",
  );
  await expect(
    page
      .getByRole("navigation", { name: "Categorii de tarife" })
      .getByRole("link"),
  ).toHaveCount(6);
  const women = page
    .getByRole("heading", { level: 3, name: "Tuns damă", exact: true })
    .locator("..");
  const men = page
    .getByRole("heading", { level: 3, name: "Barber", exact: true })
    .locator("..");
  await expect(women).toContainText("85 lei");
  await expect(women).not.toContainText("Tuns bărbați");
  await expect(men).toContainText("Tuns bărbați");
  await expect(men).toContainText("75 lei");
  await expect(men).not.toContainText("Tuns damă");
  for (const [name, price] of [
    ["Tuns Cristina", "150 lei"],
    ["Pudră / vopsea", "15 lei / 10 g"],
    ["Schimbare culoare", "150–250 lei"],
    ["Coafat special extra", "120 / 150 lei"],
    ["Dermapen facial + gât + decolteu", "900 lei"],
    ["6 ședințe de radiofrecvență", "1.450 lei"],
    ["Vacuum dublu — 8 ședințe", "880 lei"],
    ["Manichiură semipermanentă", "175 lei"],
    ["Reparație unghie", "20 lei / unghie"],
  ]) {
    const row = page.locator("[data-tariff]").filter({
      has: page.locator("dt").filter({
        hasText: new RegExp(
          `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|\\d)`,
        ),
      }),
    });
    await expect(row).toHaveCount(1);
    await expect(row.locator("dd").first()).toHaveText(price);
  }
  await expect(page.locator("#tratamente-faciale")).toContainText(
    "6 săptămâni",
  );
  await expect(page.locator("#tratamente-corporale")).toContainText(
    "7 săptămâni",
  );
  await expect(page.locator("#manichiura-pedichiura")).toContainText(
    "1 h 30 min",
  );
});

test("mobile services lead to their tariffs and the menu returns to the homepage", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#servicii");
  await page
    .locator("#servicii")
    .getByRole("link", { name: "Tuns damă & barber", exact: true })
    .click();
  await expect(page).toHaveURL(/\/preturi#tuns-barber$/);
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Tuns damă & barber",
      exact: true,
    }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  const menu = page.getByRole("dialog", { name: "Meniu principal" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Despre", exact: true }).click();
  await expect(page).toHaveURL(/\/#despre$/);
  await expect(page.locator("#despre")).toContainText(
    "FASON este mai mult decât un studio de hairstyling.",
  );
});
