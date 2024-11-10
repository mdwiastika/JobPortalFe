import type { SVGProps } from "react";

export default function PinPointIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="#0A65CC"
        d="M24.005 15.5a6 6 0 1 0 0 12a6 6 0 0 0 0-12m-3.5 6a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0M37 32L26.912 42.71a4 4 0 0 1-5.824 0L11 32h.038l-.017-.02l-.021-.025A16.92 16.92 0 0 1 7 21c0-9.389 7.611-17 17-17s17 7.611 17 17a16.92 16.92 0 0 1-4 10.955l-.021.025l-.017.02zm-1.943-1.619A14.43 14.43 0 0 0 38.5 21c0-8.008-6.492-14.5-14.5-14.5S9.5 12.992 9.5 21a14.43 14.43 0 0 0 3.443 9.381l.308.363l9.657 10.251a1.5 1.5 0 0 0 2.184 0l9.657-10.251z"
      ></path>
    </svg>
  );
}