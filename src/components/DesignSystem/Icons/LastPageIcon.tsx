import { FunctionComponent, SVGProps } from "react";

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export const LastPageIcon: SVGComponent = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...props}>
    <path
      d="M4.667 4a.667.667 0 0 1 .666.667v6.666a.667.667 0 1 1-1.333 0V4.667A.667.667 0 0 1 4.667 4zM10 9.427V6.573L7.979 8 10 9.427zM6.053 8.272a.333.333 0 0 1 0-.544l4.755-3.357a.333.333 0 0 1 .525.272v6.714a.333.333 0 0 1-.525.272L6.053 8.272z"
      fill="#currentColor"
    />
  </svg>
);
