import type { SVGProps } from "react";

export default function FeBookmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.fill || "currentColor"}
        d="M18 4H6v14.764l6-3l6 3zM6 2h12a2 2 0 0 1 2 2v18l-8-4l-8 4V4a2 2 0 0 1 2-2m8 4h2v6h-2z"
      ></path>
    </svg>
  );
}
