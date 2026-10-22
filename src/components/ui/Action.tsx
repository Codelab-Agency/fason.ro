import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Arrow } from "./Icon";

type ActionOptions = {
  children: ReactNode;
  variant?: "solid" | "text";
  tone?: "light" | "dark";
  revealArrow?: boolean;
};

function actionClass(
  variant: "solid" | "text",
  tone: "light" | "dark",
  className: string,
) {
  const base =
    "group/action inline-flex max-w-full items-center justify-center text-[12px] font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-[13px] motion-reduce:transition-none";
  const surface =
    variant === "solid"
      ? `min-h-13 gap-6 rounded-full px-6 py-4 ${tone === "light" ? "bg-cream text-ink hover:bg-sand focus-visible:bg-sand focus-visible:outline-cream" : "bg-ink text-cream hover:bg-accent focus-visible:bg-accent focus-visible:outline-accent"}`
      : `min-h-11 gap-3 ${tone === "light" ? "text-cream hover:text-gold focus-visible:outline-cream" : "text-ink hover:text-accent focus-visible:outline-accent"}`;
  return `${base} ${surface} ${className}`;
}

function ActionContent({
  children,
  variant,
  tone,
  revealArrow,
}: Required<Omit<ActionOptions, "revealArrow">> & { revealArrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`shrink-0 transition-transform duration-300 group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 group-focus-visible/action:translate-x-0.5 group-focus-visible/action:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${variant === "text" ? (tone === "light" ? "text-gold" : "text-accent") : ""}`}
      >
        <span data-action-arrow={revealArrow ? "" : undefined} className="flex">
          <Arrow className="size-4" />
        </span>
      </span>
    </>
  );
}

export function ActionButton({
  children,
  variant = "solid",
  tone = "dark",
  revealArrow,
  className = "",
  type = "button",
  ...props
}: ActionOptions & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={actionClass(variant, tone, className)}
      {...props}
    >
      <ActionContent variant={variant} tone={tone} revealArrow={revealArrow}>
        {children}
      </ActionContent>
    </button>
  );
}

export function ActionLink({
  children,
  variant = "text",
  tone = "dark",
  revealArrow,
  className = "",
  ...props
}: ActionOptions & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={actionClass(variant, tone, className)} {...props}>
      <ActionContent variant={variant} tone={tone} revealArrow={revealArrow}>
        {children}
      </ActionContent>
    </a>
  );
}
