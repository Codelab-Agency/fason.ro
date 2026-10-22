export type GoogleReview = {
  id: string;
  author: string;
  authorUrl: string | null;
  avatar: string | null;
  rating: number;
  text: string;
  date: string;
  url: string;
};

export type GoogleReviewsData = {
  status: "ready";
  rating: number | null;
  count: number | null;
  url: string;
  reviews: GoogleReview[];
  attributions: { name: string; url: string }[];
};

export type GoogleReviewsResponse =
  GoogleReviewsData | { status: "unavailable" };
