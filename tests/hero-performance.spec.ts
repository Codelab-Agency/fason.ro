import { test, expect } from "@playwright/test";

for (const mobile of [false, true]) {
  test.describe(mobile ? "touch screen" : "mouse input", () => {
    test.use({ hasTouch: mobile });
    test(`hero shares its responsive photograph and rests between interactions on ${mobile ? "mobile" : "desktop"}`, async ({
      page,
    }) => {
      await page.setViewportSize(
        mobile ? { width: 390, height: 844 } : { width: 1440, height: 960 },
      );
      await page.addInitScript(() => {
        const counter = window as unknown as { heroDraws: number };
        counter.heroDraws = 0;
        const draw = WebGL2RenderingContext.prototype.drawElements;
        WebGL2RenderingContext.prototype.drawElements = function (...args) {
          counter.heroDraws++;
          return draw.apply(this, args);
        };
      });
      const originals: string[] = [];
      page.on("request", (request) => {
        if (/\/images\/hero-(portrait|landscape)\.jpg$/.test(request.url()))
          originals.push(request.url());
      });
      await page.goto("/");
      await expect
        .poll(() =>
          page
            .locator("#acasa picture img")
            .evaluate((image) => (image as HTMLImageElement).currentSrc),
        )
        .toMatch(/\/images\/hero\/(mobile|desktop)-\d+\.[a-f0-9]+\.webp$/);
      const draws = () =>
        page.evaluate(
          () => (window as unknown as { heroDraws: number }).heroDraws,
        );
      if (mobile) {
        const photograph = page.locator("#acasa picture img");
        await expect(photograph).toHaveCSS("transform", "none");
        await expect(photograph).toHaveCSS("filter", "none");
        await expect(photograph).toHaveCSS("transform", "none");
        await expect(page.locator("#acasa canvas")).toHaveCount(0);
        const before = await page
          .locator(".hero-visual")
          .evaluate((element) => getComputedStyle(element).transform);
        await page.locator("#acasa").tap({ position: { x: 150, y: 350 } });
        await page.waitForTimeout(300);
        expect(await draws()).toBe(0);
        await expect(photograph).toHaveCSS("filter", "none");
        await page.evaluate(() =>
          window.scrollTo({ top: 100, behavior: "instant" }),
        );
        await expect
          .poll(() =>
            page
              .locator(".hero-visual")
              .evaluate((element) => getComputedStyle(element).transform),
          )
          .not.toBe(before);
      } else {
        await expect(page.locator("#acasa canvas")).toHaveCSS("opacity", "1", {
          timeout: 15_000,
        });
        await expect.poll(draws).toBeGreaterThan(0);
        await page.waitForTimeout(4000);
        const resting = await draws();
        await page.waitForTimeout(600);
        expect(await draws()).toBe(resting);
        await page.mouse.move(600, 450);
        await page.mouse.move(850, 500, { steps: 6 });
        await expect.poll(draws).toBeGreaterThan(resting);
      }
      expect(originals).toEqual([]);
    });
  });
}
