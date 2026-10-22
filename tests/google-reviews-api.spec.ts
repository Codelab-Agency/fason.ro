import { test, expect } from "@playwright/test";
import { GET } from "../src/app/api/google-reviews/route";
import { location } from "../src/lib/salon";

test("Google reviews: missing key, attribution, original text, errors and no caching", async () => {
  const originalKey = process.env.GOOGLE_PLACES_API_KEY;
  const originalFetch = globalThis.fetch;
  try {
    delete process.env.GOOGLE_PLACES_API_KEY;
    globalThis.fetch = async () => {
      throw new Error("Unexpected request without key");
    };
    let response = await GET();
    expect(await response.json()).toEqual({ status: "unavailable" });
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");

    process.env.GOOGLE_PLACES_API_KEY = "test-only-key";
    globalThis.fetch = async (input, options) => {
      expect(input).toBe(
        `https://places.googleapis.com/v1/places/${location.placeId}?languageCode=ro`,
      );
      expect(options?.cache).toBe("no-store");
      expect(options?.headers).toMatchObject({
        "X-Goog-Api-Key": "test-only-key",
      });
      return Response.json({
        rating: 4.2,
        userRatingCount: 10,
        reviews: [
          {
            name: "review-1",
            rating: 2,
            text: { text: "Translated" },
            originalText: { text: "Original" },
            googleMapsUri: "https://www.google.com/maps/reviews/example",
            authorAttribution: {
              displayName: "Test author",
              uri: "javascript:alert(1)",
            },
          },
          { name: "review-2", rating: 5, text: { text: "Second" } },
        ],
      });
    };
    response = await GET();
    const data = await response.json();
    expect(data.rating).toBe(4.2);
    expect(
      data.reviews.map((review: { rating: number }) => review.rating),
    ).toEqual([2, 5]);
    expect(data.reviews[0]).toMatchObject({
      text: "Original",
      author: "Test author",
      authorUrl: null,
      url: "https://www.google.com/maps/reviews/example",
    });
    expect(JSON.stringify(data)).not.toContain("test-only-key");

    globalThis.fetch = async () => new Response(null, { status: 403 });
    expect(await (await GET()).json()).toEqual({ status: "unavailable" });
    globalThis.fetch = async () => {
      throw new Error("Timeout");
    };
    expect(await (await GET()).json()).toEqual({ status: "unavailable" });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.GOOGLE_PLACES_API_KEY;
    else process.env.GOOGLE_PLACES_API_KEY = originalKey;
  }
});
