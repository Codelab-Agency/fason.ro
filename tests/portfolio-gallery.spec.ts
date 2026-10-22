import { expect, test } from "@playwright/test";

test("gallery fades in and out, queues navigation, traps focus and restores the page", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const opener = page.getByRole("button", {
    name: "Deschide Volum & textură",
    exact: true,
  });
  await opener.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const scroll = await page.evaluate(() => scrollY);
  await opener.click();
  const gallery = page.locator("#portfolio-gallery");
  await expect(gallery).toHaveAttribute("data-state", "open");
  const next = gallery.getByRole("button", {
    name: "Fotografia următoare",
    exact: true,
  });
  await next.click();
  await next.click();
  await expect(gallery).toHaveAttribute("aria-label", "Textură în mișcare");
  await expect(gallery).toHaveAttribute("data-state", "open");
  await page.keyboard.press("ArrowLeft");
  await expect(gallery).toHaveAttribute("aria-label", "Culoare creativă");
  await expect(gallery).toHaveAttribute("data-state", "open");
  await gallery
    .getByRole("button", { name: "Vezi Blond geometric", exact: true })
    .click();
  await expect(gallery).toHaveAttribute("data-state", "open");
  await page.keyboard.press("ArrowRight");
  await expect(gallery).toHaveAttribute("aria-label", "Volum & textură");
  await expect(gallery).toHaveAttribute("data-state", "open");
  const close = gallery.getByRole("button", {
    name: "Închide galeria",
    exact: true,
  });
  await close.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(next).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.mouse.wheel(0, 500);
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  await page.screenshot({ path: ".preview/gallery-tested-desktop.png" });
  const closing = await close.evaluate((button) => {
    (button as HTMLButtonElement).click();
    return {
      phase:
        document.querySelector<HTMLElement>("#portfolio-gallery")?.dataset
          .state,
      overflow: document.documentElement.style.overflow,
    };
  });
  expect(closing).toEqual({ phase: "closing", overflow: "hidden" });
  await expect(gallery).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  expect(
    await page.evaluate(() => document.documentElement.style.overflow),
  ).toBe("");
  expect(errors).toEqual([]);
});

test("gallery supports native touch swipes and fits phones and landscape", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Deschide Volum & textură", exact: true })
      .click();
    const gallery = page.locator("#portfolio-gallery");
    await expect(gallery).toHaveAttribute("data-state", "open");
    const bounds = (await gallery
      .locator("[data-gallery-stage]")
      .boundingBox())!;
    const cdp = await context.newCDPSession(page);
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + bounds.height / 2;
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: x + 70, y }],
    });
    for (const offset of [40, 10, -30, -70])
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x + offset, y }],
      });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await expect(gallery).toHaveAttribute("aria-label", "Culoare creativă");
    await expect(gallery).toHaveAttribute("data-state", "open");
    await page.screenshot({ path: ".preview/gallery-tested-mobile.png" });
    for (const viewport of [
      { width: 320, height: 480 },
      { width: 568, height: 320 },
      { width: 844, height: 390 },
      { width: 768, height: 1024 },
    ]) {
      await page.setViewportSize(viewport);
      await expect
        .poll(() =>
          gallery.evaluate(
            (element) =>
              Math.abs(element.clientHeight - innerHeight) < 2 &&
              Math.abs(element.clientWidth - innerWidth) < 2,
          ),
        )
        .toBe(true);
      const layout = await gallery.evaluate((element) => {
        const controls = [...element.querySelectorAll("button")].map(
          (button) => {
            const r = button.getBoundingClientRect();
            return (
              r.x >= 0 &&
              r.y >= 0 &&
              r.right <= innerWidth + 1 &&
              r.bottom <= innerHeight + 1 &&
              r.height >= 44
            );
          },
        );
        return {
          fits: element.scrollHeight <= element.clientHeight + 1,
          controls,
          stage: element.querySelector("[data-gallery-stage]")!.clientHeight,
        };
      });
      expect(layout.fits).toBe(true);
      expect(layout.controls.every(Boolean)).toBe(true);
      expect(layout.stage).toBeGreaterThan(80);
    }
    await gallery
      .getByRole("button", { name: "Închide galeria", exact: true })
      .click();
    await expect(gallery).toHaveCount(0);
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test("gallery closes during its entrance and respects changing motion preferences", async ({
  page,
}) => {
  await page.goto("/");
  const opener = page.getByRole("button", {
    name: "Deschide Blond geometric",
    exact: true,
  });
  const gallery = page.locator("#portfolio-gallery");
  await opener.scrollIntoViewIfNeeded();
  await opener.focus();
  const entrance = await opener.evaluate(
    (button) =>
      new Promise<string>((resolve) => {
        const check = () => {
          const element =
            document.querySelector<HTMLDialogElement>("#portfolio-gallery");
          if (!element?.open) return;
          observer.disconnect();
          const state = element.dataset.state ?? "";
          element.dispatchEvent(new Event("cancel", { cancelable: true }));
          resolve(state);
        };
        const observer = new MutationObserver(check);
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["open"],
        });
        (button as HTMLButtonElement).click();
        queueMicrotask(check);
      }),
  );
  expect(entrance).toBe("opening");
  await expect(gallery).toHaveCount(0);
  await opener.click();
  await expect(gallery).toHaveAttribute("data-state", "open");
  await gallery
    .getByRole("button", { name: "Fotografia următoare", exact: true })
    .click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(gallery).toHaveAttribute("aria-label", "Volum & textură");
  await expect(gallery).toHaveAttribute("data-state", "open");
  await page.keyboard.press("Escape");
  await expect(gallery).toHaveCount(0);
  await opener.click();
  await expect(gallery).toHaveAttribute("data-state", "open");
  await page.keyboard.press("ArrowLeft");
  await expect(gallery).toHaveAttribute("aria-label", "Textură în mișcare");
  await expect(gallery).toHaveAttribute("data-state", "open");
  await page.keyboard.press("Escape");
  await expect(gallery).toHaveCount(0);
});
