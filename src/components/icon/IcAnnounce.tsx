import { ComponentPropsWithoutRef } from 'react';

export default function IcAnnounce({ fill = '#646464', ...rest }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g clipPath="url(#clip0_2935_74)">
        <path
          d="M5.62853 5.54857C3.17139 5.54857 1.17139 7.54857 1.17139 10.0057C1.17139 12.4629 3.17139 14.4629 5.62853 14.4629H10.0742C13.7428 14.4629 16.2228 16.0286 17.4914 17.08C17.8685 17.4 18.4514 17.1143 18.4514 16.6229V3.38857C18.4514 2.89714 17.8685 2.61142 17.4914 2.93142C16.2342 3.98285 13.7428 5.54857 10.0742 5.54857H5.62853Z"
          stroke={fill}
          strokeWidth="1.05"
          strokeMiterlimit="10"
        />
        <path
          d="M8.49709 14.1543L9.1028 15.5143L10.6342 18.9429C10.9885 19.7429 10.6342 20.6686 9.83423 21.0343C9.03423 21.3886 8.10852 21.0343 7.7428 20.2343L5.22852 14.5886"
          stroke={fill}
          strokeWidth="1.05"
          strokeMiterlimit="10"
        />
        <path d="M21.0569 6.53143L22.4169 5.18286" stroke={fill} strokeMiterlimit="10" strokeLinecap="round" />
        <path d="M21.0569 9.17139H22.8283" stroke={fill} strokeMiterlimit="10" strokeLinecap="round" />
        <path d="M21.0569 11.8114L22.4169 13.16" stroke={fill} strokeMiterlimit="10" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_2935_74">
          <rect width="22.8" height="19.5543" fill="white" transform="translate(0.599854 2.22284)" />
        </clipPath>
      </defs>
    </svg>
  );
}
