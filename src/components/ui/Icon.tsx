import type { SVGProps } from "react";

export function Arrow({
  direction = "up-right",
  ...props
}: SVGProps<SVGSVGElement> & {
  direction?: "up-right" | "right" | "down" | "left";
}) {
  const rotation = { "up-right": 0, right: 45, down: 135, left: 225 }[
    direction
  ];
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <g transform={`rotate(${rotation} 12 12)`}>
        <path
          d="M5 19 19 5M5 5h14v14"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
