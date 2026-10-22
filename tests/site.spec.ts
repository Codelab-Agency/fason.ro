import { test, expect } from "@playwright/test";

test("desktop: hero WebGL, services, gallery and direct contact", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "mai multtu.",
  );
  await expect(page.locator("#acasa canvas")).toBeVisible();
  await expect(page.locator("#acasa canvas")).toHaveCSS("opacity", "1", {
    timeout: 15_000,
  });
  await page.mouse.move(900, 430);
  await page.mouse.move(400, 480, { steps: 12 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: ".preview/desktop-hero.png" });

  const firstService = page.getByRole("link", {
    name: "Tuns & formă",
    exact: true,
  });
  const serviceItems = page.locator("#servicii article");
  await expect(serviceItems).toHaveCount(6);
  for (const article of await serviceItems.all()) {
    await article.scrollIntoViewIfNeeded();
    await expect(article.locator("p")).toBeVisible();
  }
  await firstService.scrollIntoViewIfNeeded();
  await expect(firstService).toHaveAttribute("href", "#programari");
  await firstService.click();
  await expect(page).toHaveURL(/#programari$/);
  await expect(page.locator("#programari h2")).toBeInViewport();
  await expect(page.locator("form")).toHaveCount(0);

  await page
    .getByRole("navigation", { name: "Navigare principală" })
    .getByRole("link", { name: "Portofoliu", exact: true })
    .click();
  const golden = page.getByRole("button", { name: "Deschide Blond geometric" });
  await expect
    .poll(async () => {
      const bounds = await golden.boundingBox();
      return !!bounds && bounds.x >= 0 && bounds.x + bounds.width <= 1440;
    })
    .toBe(true);
  await golden.click();
  await expect(
    page.getByRole("dialog", { name: "Blond geometric" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);

  await page.getByRole("link", { name: "Programări", exact: true }).click();
  await expect(page).toHaveURL(/#programari$/);
  await expect(page.locator("#programari")).toContainText(
    "Datele de contact vor fi disponibile în curând.",
  );
  await expect(
    page.locator('a[href^="tel:"], a[href^="https://wa.me/"]'),
  ).toHaveCount(0);

  for (const id of ["programari", "echipa", "despre", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
    await expect(page.locator(`#${id} h2`).first()).toHaveCSS("opacity", "1");
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: ".preview/desktop-full.png", fullPage: true });
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  expect(errors).toEqual([]);
});

test("mobile: navigation, no overflow and direct contact access", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForTimeout(3500);
  await page.screenshot({ path: ".preview/mobile-hero.png" });
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  const menu = page.getByRole("dialog", { name: "Meniu principal" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Servicii" }).click();
  await expect(menu).not.toBeVisible();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(200);
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await menu
    .getByRole("link", { name: "Vorbește cu noi", exact: true })
    .click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#programari$/);
  await expect(page.locator("#programari h2")).toBeInViewport();
  await expect(page.locator("form")).toHaveCount(0);
  for (const id of [
    "servicii",
    "programari",
    "portofoliu",
    "echipa",
    "despre",
    "contact",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
  }
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.screenshot({ path: ".preview/mobile-full.png", fullPage: true });
});

test("reduced motion and unavailable WebGL keep the photograph and content visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#acasa img").first()).toBeVisible();
  await expect(page.locator("#acasa canvas")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
    "opacity",
    "1",
  );
  await page.locator("#servicii").scrollIntoViewIfNeeded();
  await expect(page.locator("#servicii h2")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (
        type === "webgl" ||
        type === "webgl2" ||
        type === "experimental-webgl"
      )
        return null;
      return getContext.apply(this, [type, ...args] as Parameters<
        typeof getContext
      >);
    } as typeof getContext;
  });
  await page.reload();
  await expect(page.locator("#acasa img").first()).toBeVisible();
  await expect(page.locator("#acasa canvas")).toHaveCount(0);
});
