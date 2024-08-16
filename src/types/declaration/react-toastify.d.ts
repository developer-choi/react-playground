import {MouseEvent} from 'react';

export declare module 'react-toastify' {
  export interface CloseButtonProps {
    closeToast: (event: MouseEvent<HTMLElement>) => void;
    type: 'info' | 'success' | 'warning' | 'error' | 'default';
    ariaLabel?: string;
    theme: 'light' | 'dark' | 'colored' | (string & {});
  }
}
