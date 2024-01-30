import { FunctionComponent, SVGProps } from "react";

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export const ArrowIcon: SVGComponent = ({ style, ...rest }) => (
  <svg
    width="7.564"
    height="12.898"
    viewBox="0 0 7.564 12.898"
    style={{ fill: "none", stroke: "#e7e7e7", strokeWidth: "2", ...style }}
    {...rest}
  >
    <path
      id="Path_11201"
      data-name="Path 11201"
      d="M188.686,62.642l6.479,6.469-6.479,5.7"
      transform="translate(-188.332 -62.288)"
    />
  </svg>
);
