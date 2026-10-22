import { formatServicePrice, type ServicePrice as Price } from "@/lib/pricing";

export function ServicePrice({ price }: { price: Price | null }) {
  return (
    <span className="shrink-0 pt-3 text-right text-[0.875rem] leading-[1.5] font-medium tracking-[-0.02em] text-accent tabular-nums">
      {formatServicePrice(price) ?? "La cerere"}
    </span>
  );
}
