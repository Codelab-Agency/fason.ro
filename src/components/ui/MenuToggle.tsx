import type { ComponentPropsWithRef } from "react";

export function MenuToggle({
  expanded,
  className = "",
  ...props
}: ComponentPropsWithRef<"button"> & { expanded: boolean }) {
  return (
    <button
      type="button"
      aria-label={expanded ? "Închide meniul" : "Deschide meniul"}
      aria-expanded={expanded}
      aria-controls="mobile-menu"
      aria-haspopup="dialog"
      className={`flex size-[44px] shrink-0 items-center justify-center ${className}`}
      {...props}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <line data-menu-toggle-line="top" x1="3" y1="8" x2="21" y2="8" />
        <line data-menu-toggle-line="bottom" x1="9" y1="16" x2="21" y2="16" />
      </svg>
    </button>
  );
}
