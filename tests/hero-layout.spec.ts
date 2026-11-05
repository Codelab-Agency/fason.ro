import { test, expect } from "@playwright/test";

test("hero words and subtitles stay inside the photograph on phones, laptops and enlarged text", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height, zoom] of [
    [320, 568, 100],
    [390, 844, 100],
    [768, 1024, 100],
    [1024, 768, 100],
    [1280, 720, 100],
    [1440, 960, 100],
    [1920, 1080, 100],
    [320, 568, 200],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate((size) => {
      document.documentElement.style.fontSize = `${size}%`;
      window.scrollTo({ top: 0, behavior: "instant" });
    }, zoom);
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    const escaped = await page.locator("#acasa").evaluate((hero) => {
      const bounds = hero.getBoundingClientRect();
      return [
        ...hero.querySelectorAll("h1, .hero-letter, .hero-intro p"),
      ].flatMap((element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return [...range.getClientRects()]
          .filter(
            (r) =>
              r.width &&
              r.height &&
              (r.left < bounds.left - 1 ||
                r.right > bounds.right + 1 ||
                r.top < bounds.top - 1 ||
                r.bottom > bounds.bottom + 1),
          )
          .map(() => element.textContent);
      });
    });
    expect(escaped, `${width}×${height}, text ${zoom}%`).toEqual([]);
  }
});
