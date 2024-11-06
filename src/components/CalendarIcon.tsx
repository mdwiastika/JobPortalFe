import type { SVGProps } from "react";

export default function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width={14} height={0} x={5} y={5} fill="currentColor">
        <animate
          fill="freeze"
          attributeName="height"
          begin="0.6s"
          dur="0.2s"
          values="0;3"
        ></animate>
      </rect>
      <g
        fill="none"
        stroke="#0A65CC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={64}
          strokeDashoffset={64}
          d="M12 4h7c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </path>
        <path strokeDasharray={4} strokeDashoffset={4} d="M7 4v-2M17 4v-2">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="4;0"
          ></animate>
        </path>
        <path strokeDasharray={12} strokeDashoffset={12} d="M7 11h10">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="12;0"
          ></animate>
        </path>
        <path strokeDasharray={8} strokeDashoffset={8} d="M7 15h7">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}
