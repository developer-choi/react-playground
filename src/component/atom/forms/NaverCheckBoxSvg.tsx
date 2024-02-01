import React, {SVGProps} from "react";

export default function NaverCheckBoxSvg({color, ...rest}: SVGProps<any>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" {...rest}>
      <g stroke={color}>
        <g fill="#fff">
          <circle cx={13} cy={13} r={13} stroke="none" />
          <circle cx={13} cy={13} r={12.5} fill="none" />
        </g>
        <path d="M7.5 12.368l3.636 4.395 8.223-7.267" fill="none" />
      </g>
    </svg>
  );
}
