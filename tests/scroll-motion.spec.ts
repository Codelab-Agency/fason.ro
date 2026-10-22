import { test, expect } from "@playwright/test";

for (const viewport of [
  { width: 1440, height: 960 },
  { width: 390, height: 844 },
]) {
  test(`scroll scenes keep photos aligned and complete their reveals at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const frames = page.locator("#portofoliu [data-photo-reveal]");
    const before = await frames.evaluateAll((elements) =>
      elements.map((element) => ({
        width: element.clientWidth,
        height: element.clientHeight,
      })),
    );

    for (const frame of await frames.all()) {
      await frame.scrollIntoViewIfNeeded();
      await expect(frame).toHaveCSS("clip-path", "none");
      await expect(frame).toHaveCSS("opacity", "1");
      await expect(frame.locator("img")).toHaveCSS("transform", "none");
      await expect(frame.locator("img")).toHaveCSS("filter", "none");
    }

    expect(
      await frames.evaluateAll((elements) =>
        elements.map((element) => ({
          width: element.clientWidth,
          height: element.clientHeight,
        })),
      ),
    ).toEqual(before);
    await expect(
      page.getByRole("heading", { name: "Fă-ți de cap.", exact: true }),
    ).toBeAttached();

    const story = page.locator("[data-ink-story]");
    await story.evaluate((element) => {
      window.scrollTo({
        top:
          element.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * 0.65,
        behavior: "instant",
      });
    });
    await expect
      .poll(async () => {
        const values = await story
          .locator("[data-ink-word]")
          .evaluateAll((words) =>
            words.map((word) => Number(getComputedStyle(word).opacity)),
          );
        return values[0] > values[values.length - 1];
      })
      .toBe(true);
    await story.evaluate((element) => {
      window.scrollTo({
        top:
          element.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * 0.35,
        behavior: "instant",
      });
    });
    await expect(story.locator("[data-ink-word]").last()).toHaveCSS(
      "opacity",
      "1",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("keyboard focus reveals a photo control and reduced motion clears running scenes", async ({
  page,
}) => {
  await page.goto("/");
  const golden = page.getByRole("button", {
    name: "Deschide Blond geometric",
    exact: true,
  });
  await golden.focus();
  await expect(golden).toBeFocused();
  const frame = golden.locator("..");
  await expect(frame).toHaveCSS("clip-path", "none");
  await expect(frame.locator("img")).toHaveCSS("transform", "none");
  await expect(frame.locator("img")).toHaveCSS("filter", "none");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("dialog", { name: "Blond geometric", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator("[data-scroll-word]")
        .evaluateAll((elements) =>
          elements.every(
            (element) => getComputedStyle(element).transform === "none",
          ),
        ),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page
        .locator("[data-photo-reveal]")
        .evaluateAll((elements) =>
          elements.every(
            (element) =>
              getComputedStyle(element).clipPath === "none" &&
              getComputedStyle(element).transform === "none" &&
              getComputedStyle(element.querySelector("img")!).transform ===
                "none" &&
              getComputedStyle(element.querySelector("img")!).filter === "none",
          ),
        ),
    )
    .toBe(true);
  for (const id of ["portofoliu", "contact"])
    await expect(page.locator(`#${id}`)).toHaveCSS("clip-path", "none");
  await expect(page.locator("[data-ink-word]").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.setViewportSize({ width: 320, height: 568 });
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
});
