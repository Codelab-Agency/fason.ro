import { expect, test } from "@playwright/test";

test("Google data is shown inline with its original text, author and attribution", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/api/google-reviews", (route) =>
    route.fulfill({
      json: {
        status: "ready",
        rating: 4.2,
        count: 12,
        url: "https://www.google.com/maps/",
        reviews: [
          {
            id: "test-review",
            author: "Autor de test",
            authorUrl: "https://www.google.com/maps/contrib/test",
            avatar: null,
            rating: 2,
            text: "Textul original furnizat de răspunsul API pentru acest test.",
            date: "acum o lună",
            url: "https://www.google.com/maps/reviews/test",
          },
        ],
        attributions: [
          { name: "Furnizor de test", url: "https://example.test/source" },
        ],
      },
    }),
  );
  await page.goto("/");
  const reviews = page.locator("#recenzii");
  await reviews.scrollIntoViewIfNeeded();
  await expect(
    reviews.getByText(
      "Textul original furnizat de răspunsul API pentru acest test.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    reviews.getByRole("link", { name: "Autor de test" }),
  ).toHaveAttribute("href", "https://www.google.com/maps/contrib/test");
  await expect(
    reviews.getByLabel("2 din 5 stele", { exact: true }),
  ).toBeVisible();
  await expect(
    reviews.getByRole("img", { name: "Google Maps", exact: true }),
  ).toBeVisible();
  await expect(
    reviews.getByRole("link", { name: "Furnizor de test" }),
  ).toBeVisible();
  await reviews.getByRole("button", { name: "Recenzii pe Google" }).click();
  await expect(
    page.getByRole("dialog", { name: "Recenzii Google", exact: true }),
  ).toContainText(
    "Textul original furnizat de răspunsul API pentru acest test.",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
});

test("unavailable Google data keeps a real reviews link without invented ratings", async ({
  page,
}) => {
  await page.route("**/api/google-reviews", (route) =>
    route.fulfill({ json: { status: "unavailable" } }),
  );
  await page.goto("/");
  const reviews = page.locator("#recenzii");
  await reviews.scrollIntoViewIfNeeded();
  await expect(
    reviews.getByRole("link", { name: "Recenzii pe Google" }),
  ).toHaveAttribute("href", /^https:\/\/search\.google\.com\/local\/reviews\?/);
  await expect(reviews.locator("article")).toHaveCount(0);
});
