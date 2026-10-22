import type { ReactNode } from "react";

export function SectionLabel({
  children,
  dark = false,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  as?: "p" | "h2" | "span";
}) {
  return (
    <Tag
      className={`block w-fit max-w-full font-sans text-[0.8125rem] leading-[1.4] font-medium tracking-[-0.01em] [overflow-wrap:anywhere] first-letter:font-semibold ${dark ? "text-cream/80 first-letter:text-gold" : "text-ink/80 first-letter:text-accent"} ${className}`}
    >
      {children}
    </Tag>
  );
}
