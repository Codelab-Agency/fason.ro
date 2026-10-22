import { location } from "@/lib/salon";
import type { GoogleReviewsData } from "@/lib/google-reviews";

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  attributions?: { provider?: string; providerUri?: string }[];
  reviews?: {
    name?: string;
    rating?: number;
    originalText?: { text?: string };
    text?: { text?: string };
    relativePublishTimeDescription?: string;
    googleMapsUri?: string;
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }[];
};

function httpsUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).protocol === "https:" ? value : null;
  } catch {
    return null;
  }
}

const privateHeaders = { "Cache-Control": "private, no-store" };

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const unavailable = () =>
    Response.json({ status: "unavailable" }, { headers: privateHeaders });
  if (!key) return unavailable();

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${location.placeId}?languageCode=ro`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews,attributions",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      },
    );
    if (!response.ok) return unavailable();
    const place: PlaceResponse = await response.json();
    const data: GoogleReviewsData = {
      status: "ready",
      rating: typeof place.rating === "number" ? place.rating : null,
      count:
        typeof place.userRatingCount === "number"
          ? place.userRatingCount
          : null,
      url: httpsUrl(place.googleMapsUri) ?? location.reviewsUrl,
      // Preserve Google's relevance order, including reviews with lower ratings.
      reviews: (place.reviews ?? []).map((review, index) => ({
        id: review.name ?? String(index),
        author: review.authorAttribution?.displayName ?? "Utilizator Google",
        authorUrl: httpsUrl(review.authorAttribution?.uri),
        avatar: httpsUrl(review.authorAttribution?.photoUri),
        rating: review.rating ?? 0,
        text: review.originalText?.text ?? review.text?.text ?? "",
        date: review.relativePublishTimeDescription ?? "",
        url: httpsUrl(review.googleMapsUri) ?? location.reviewsUrl,
      })),
      attributions: (place.attributions ?? []).flatMap((item) => {
        const url = httpsUrl(item.providerUri);
        return item.provider && url ? [{ name: item.provider, url }] : [];
      }),
    };
    return Response.json(data, { headers: privateHeaders });
  } catch {
    return unavailable();
  }
}
