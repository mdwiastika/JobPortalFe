import type { SVGProps } from "react";

export default function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#006eff"
        d="M10 14v-2.615l9.683-9.683l2.56 2.564L12.518 14zm9.466-8.354l1.347-1.361l-1.111-1.17l-1.387 1.381zM4 20V4h10.002l-6.386 6.387v5.998h5.896L20 9.895V20z"
      ></path>
    </svg>
  );
}