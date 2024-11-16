import type { SVGProps } from "react";

export default function RemoveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.9em"
      height="1.9em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          fill="#ff0000"
          fillOpacity={0.25}
          d="M4 7.5c0-.236 0-.354.073-.427S4.264 7 4.5 7h15c.236 0 .354 0 .427.073S20 7.264 20 7.5v.252c0 .09 0 .136-.014.176a.25.25 0 0 1-.057.092c-.03.03-.07.05-.151.091c-.651.325-.976.488-1.213.732a2 2 0 0 0-.453.733C18 9.896 18 10.26 18 10.988V16c0 1.886 0 2.828-.586 3.414S15.886 20 14 20h-4c-1.886 0-2.828 0-3.414-.586S6 17.886 6 16v-5.012c0-.728 0-1.092-.112-1.412a2 2 0 0 0-.453-.733c-.237-.244-.562-.407-1.213-.732a.6.6 0 0 1-.151-.091a.25.25 0 0 1-.057-.092C4 7.888 4 7.842 4 7.752z"
        ></path>
        <path
          stroke="#ff0000"
          strokeLinecap="round"
          d="M10.068 4.37c.114-.106.365-.2.715-.267A6.7 6.7 0 0 1 12 4c.44 0 .868.036 1.217.103s.6.161.715.268"
        ></path>
        <rect width={1} height={6} x={14} y={11} fill="#ff0000" rx={0.5}></rect>
        <rect width={1} height={6} x={9} y={11} fill="#ff0000" rx={0.5}></rect>
      </g>
    </svg>
  );
}