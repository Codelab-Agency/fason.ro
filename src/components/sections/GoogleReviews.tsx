"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { location } from "@/lib/salon";
import type {
  GoogleReview,
  GoogleReviewsData,
  GoogleReviewsResponse,
} from "@/lib/google-reviews";
import { ActionButton, ActionLink } from "../ui/Action";
import { Dialog } from "../ui/Dialog";

function Rating({ value }: { value: number }) {
  return (
    <span
      aria-label={`${value} din 5 stele`}
      className="text-[12px] text-ink/65"
    >
      {value.toLocaleString("ro-RO", { maximumFractionDigits: 1 })} / 5
    </span>
  );
}

function Review({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 230;
  return (
    <article className="flex min-w-0 flex-col border-t border-ink/20 pt-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Rating value={review.rating} />
        <span className="text-[10px] text-ink/65">{review.date}</span>
      </div>
      <p className={`text-sm leading-[1.8] ${expanded ? "" : "line-clamp-5"}`}>
        {review.text || "Evaluare fără comentariu."}
      </p>
      {long && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          className="mt-3 self-start text-[10px] text-ink/65 underline underline-offset-4"
        >
          {expanded ? "Mai puțin" : "Citește tot"}
        </button>
      )}
      <div className="mt-auto flex items-center gap-3 pt-7">
        {review.avatar ? (
          <Image
            unoptimized
            src={review.avatar}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-sand text-xs"
          >
            {review.author.charAt(0)}
          </span>
        )}
        <div>
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px]"
            >
              {review.author}
            </a>
          ) : (
            <p className="text-[11px]">{review.author}</p>
          )}
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-[10px] text-ink/65 underline underline-offset-4"
          >
            Recenzie pe Google
          </a>
        </div>
      </div>
    </article>
  );
}

export function GoogleReviews() {
  const root = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void fetch("/api/google-reviews", {
          signal: controller.signal,
          cache: "no-store",
        })
          .then((response) => (response.ok ? response.json() : null))
          .then((result: GoogleReviewsResponse | null) => {
            if (!controller.signal.aborted && result?.status === "ready")
              setData(result);
          })
          .catch(() => {
            /* The public Google link stays available. */
          });
      },
      { rootMargin: "200px" },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);

  return (
    <div ref={root} className="inline-flex" aria-label="Recenzii Google">
      {data ? (
        <ActionButton
          variant="text"
          onClick={() => setOpen(true)}
          aria-label="Recenzii pe Google"
          aria-haspopup="dialog"
        >
          Recenzii
        </ActionButton>
      ) : (
        <ActionLink
          href={location.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Recenzii pe Google"
        >
          Recenzii
        </ActionLink>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Recenzii Google"
        wide
      >
        <div className="pt-3">
          <p translate="no" className="mb-5 text-[14px] text-[#5e5e5e]">
            Google Maps
          </p>
          <h3 className="text-[30px] tracking-[-0.04em]">
            Recenzii pentru FASON
          </h3>
          {data?.rating != null && (
            <div className="mt-5 flex items-center gap-5">
              <p className="text-[42px] tracking-[-0.04em]">
                {data.rating.toLocaleString("ro-RO", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
              </p>
              <div>
                <Rating value={data.rating} />
                {data.count != null && (
                  <p className="mt-1 text-[11px] text-ink/65">
                    {data.count} recenzii
                  </p>
                )}
              </div>
            </div>
          )}
          {data && data.reviews.length > 0 && (
            <div className="mt-6">
              <p className="mb-6 text-[10px] leading-relaxed text-ink/65">
                Recenzii oferite de Google Maps, în ordinea relevanței.
              </p>
              <div className="grid gap-8 md:grid-cols-2">
                {data.reviews.map((review) => (
                  <Review key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}
          {data?.attributions.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block text-xs text-ink/65"
            >
              {item.name}
            </a>
          ))}
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px]">
            <ActionLink
              href={location.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Toate recenziile pe Google
            </ActionLink>
            <a
              href={location.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 content-center text-ink/65"
            >
              Lasă o recenzie
            </a>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
