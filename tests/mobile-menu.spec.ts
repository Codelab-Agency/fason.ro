import { test, expect } from "@playwright/test";

test("mobile menu fits small phones, landscape and tablets without clipped links or scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 480 },
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 568, height: 320 },
    { width: 844, height: 390 },
    { width: 640, height: 900 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Deschide meniul" });
    const triggerBounds = await trigger.boundingBox();
    await trigger.click();
    const menu = page.getByRole("dialog", { name: "Meniu principal" });
    await expect(menu).toBeVisible();
    const closeBounds = await menu
      .getByRole("button", { name: "Închide meniul" })
      .boundingBox();
    expect(closeBounds).not.toBeNull();
    for (const coordinate of ["x", "y", "width", "height"] as const)
      expect(closeBounds![coordinate]).toBeCloseTo(
        triggerBounds![coordinate],
        0,
      );
    const metrics = await menu.evaluate((element) => ({
      height: element.clientHeight,
      scrollHeight: element.scrollHeight,
      width: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.height + 1);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.width + 1);
    for (const link of await menu.locator("nav a").all()) {
      const word = link.locator("[data-menu-word]");
      expect(
        await word.evaluate(
          (element) => element.scrollWidth <= element.clientWidth + 1,
        ),
      ).toBe(true);
      const bounds = await word.boundingBox();
      const available = await word.locator("..").boundingBox();
      expect(bounds).not.toBeNull();
      expect(available).not.toBeNull();
      expect(bounds!.width).toBeLessThanOrEqual(available!.width + 1);
      expect(bounds!.height).toBeLessThanOrEqual(available!.height + 1);
      const target = await link.boundingBox();
      expect(target!.height).toBeGreaterThanOrEqual(40);
      expect(target!.y + target!.height).toBeLessThanOrEqual(viewport.height);
    }
    const contact = await menu
      .getByRole("link", { name: "Vorbește cu noi", exact: true })
      .boundingBox();
    expect(contact!.y + contact!.height).toBeLessThanOrEqual(viewport.height);
    await page.keyboard.press("Tab");
    expect(
      await menu.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(menu).not.toBeVisible();
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  }
});

test("opening during hero scroll freezes the photograph and keeps the icon in place", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("#acasa .hero-photograph")).toBeVisible();
  await expect(page.locator(".site-nav")).toHaveCSS("opacity", "1");
  await page.evaluate(() => {
    const samples: Array<{
      y: number;
      transform: string;
      photoTransform: string;
    }> = [];
    Object.assign(window, { menuBackgroundSamples: samples });
    window.addEventListener("fason:dialog", (event) => {
      if (!(event as CustomEvent<{ open: boolean }>).detail.open) return;
      const snapshot = () =>
        samples.push({
          y: window.scrollY,
          transform: getComputedStyle(document.querySelector(".hero-visual")!)
            .transform,
          photoTransform: getComputedStyle(
            document.querySelector(".hero-photograph")!,
          ).transform,
        });
      snapshot();
      setTimeout(snapshot, 200);
      setTimeout(snapshot, 700);
    });
  });
  await page.mouse.wheel(0, 450);
  await page.waitForTimeout(70);
  const trigger = page.getByRole("button", { name: "Deschide meniul" });
  const before = await trigger.boundingBox();
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Meniu principal" });
  const close = menu.getByRole("button", { name: "Închide meniul" });
  await expect(menu).toBeVisible();
  expect(await close.boundingBox()).toEqual(before);
  await expect(close.locator("span")).toHaveCount(0);
  const topLine = close.locator('[data-menu-toggle-line="top"]');
  await expect
    .poll(() =>
      topLine.evaluate(
        (line) =>
          Number(line.getAttribute("y2")) - Number(line.getAttribute("y1")),
      ),
    )
    .toBeGreaterThan(13);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as typeof window & { menuBackgroundSamples: unknown[] })
            .menuBackgroundSamples.length,
      ),
    )
    .toBe(3);
  const samples = await page.evaluate(
    () =>
      (
        window as typeof window & {
          menuBackgroundSamples: Array<{
            y: number;
            transform: string;
            photoTransform: string;
          }>;
        }
      ).menuBackgroundSamples,
  );
  expect(samples[1]).toEqual(samples[0]);
  expect(samples[2]).toEqual(samples[0]);
  await close.click();
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(
    trigger.locator('[data-menu-toggle-line="top"]'),
  ).toHaveAttribute("y1", "8");
  expect(await page.evaluate(() => scrollY)).toBe(samples[0].y);
  await page.mouse.wheel(0, 120);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(samples[0].y);
});

test("animated menu navigates to contact and resets after interrupted opening", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Deschide meniul" });
  const menu = page.getByRole("dialog", { name: "Meniu principal" });
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await trigger.click();
  await menu
    .getByRole("link", { name: "Vorbește cu noi", exact: true })
    .click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#programari$/);
  await expect(page.locator("#programari h2")).toBeInViewport();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await trigger.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(menu).not.toBeVisible();
});
