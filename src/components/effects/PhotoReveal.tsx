"use client";

import { useId, type ReactNode } from "react";

export function PhotoReveal({
  children,
  className = "",
  delayed = false,
}: {
  children: ReactNode;
  className?: string;
  delayed?: boolean;
}) {
  const filterId = `photo-wave-${useId().replace(/:/g, "")}`;

  return (
    <div
      data-photo-reveal
      data-photo-delayed={delayed || undefined}
      className={`relative ${className}`}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        className="pointer-events-none absolute"
      >
        <defs>
          <filter
            id={filterId}
            data-photo-filter
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.01"
              numOctaves="1"
              seed="11"
              stitchTiles="stitch"
              result="noise"
            />
            <feOffset data-photo-wave in="noise" dx="0" dy="0" result="wave" />
            <feDisplacementMap
              data-photo-displacement
              in="SourceGraphic"
              in2="wave"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}
