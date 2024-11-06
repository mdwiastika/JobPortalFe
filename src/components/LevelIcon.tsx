import type { SVGProps } from "react";

export default function LevelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g
        fill="none"
        stroke="#0A65CC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <path d="M24 42L4 18.5L9.695 6h28.61L44 18.5z"></path>
        <path d="m32 18l-8 9l-8-9"></path>
      </g>
    </svg>
  );
}
