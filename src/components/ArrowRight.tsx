import type { SVGProps } from "react";

export default function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="white"
        d="m15.038 6.343l-1.411 1.418l3.27 3.255l-13.605.013l.002 2l13.568-.013l-3.215 3.23l1.417 1.41l5.644-5.67z"
      ></path>
    </svg>
  );
}