"use client";

import { useRef, type ButtonHTMLAttributes } from "react";
import gsap from "gsap";

export function MagneticButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={className}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const bounds = event.currentTarget.getBoundingClientRect();
        gsap.to(ref.current, {
          x: (event.clientX - bounds.left - bounds.width / 2) * 0.12,
          y: (event.clientY - bounds.top - bounds.height / 2) * 0.2,
          duration: 0.45,
          overwrite: true,
        });
      }}
      onPointerLeave={() =>
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: true,
        })
      }
    >
      {children}
    </button>
  );
}
