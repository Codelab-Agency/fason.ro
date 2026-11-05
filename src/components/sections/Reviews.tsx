import { GoogleReviews } from "./GoogleReviews";
import { SectionLabel } from "../ui/SectionLabel";

export function Reviews() {
  return (
    <section
      id="recenzii"
      aria-labelledby="reviews-heading"
      className="page-padding bg-cream pt-6 pb-20 md:pt-8 md:pb-28"
    >
      <div className="mb-8 grid gap-6 border-t border-ink/20 pt-8 md:grid-cols-2 md:gap-16">
        <div>
          <SectionLabel className="mb-6">Recenzii</SectionLabel>
          <h2
            id="reviews-heading"
            className="text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.15] tracking-[-0.045em]"
          >
            FASON, în cuvintele voastre.
          </h2>
        </div>
        <p className="max-w-[40ch] self-end text-[15px] leading-[1.85] text-ink/70">
          Părerile clienților fac parte din povestea noastră. Le poți citi
          direct pe Google.
        </p>
      </div>
      <GoogleReviews featured />
    </section>
  );
}
