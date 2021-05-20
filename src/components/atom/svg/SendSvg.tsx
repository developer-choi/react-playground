import React, {SVGProps} from 'react';

export default function SendSvg(props: SVGProps<any>) {
  
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={61}
          height={60}
          preserveAspectRatio="none slice"
          {...props}
      >
        <path
            fill="#D1D3D9"
            fillRule="evenodd"
            d="M4.268 59.683l55.085-27.052c2.194-1.077 2.194-4.183 0-5.262L4.268.318C2.302-.647-.002.773-.002 2.95L4.92 25.453l19.293 4.548L4.92 34.548-.002 57.052c0 2.177 2.304 3.596 4.27 2.631z"
        />
      </svg>
  );
}
