import {CloseButtonProps, toast, ToastOptions} from 'react-toastify';
import CloseIcon from '@/components/icon/CloseIcon';
import styles from './index.module.scss';

export interface DefaultSnackBarOptions {
  closeIcon?: boolean;
  href?: string;
}

export function snackBar(content: string, options?: DefaultSnackBarOptions, customOptions?: ToastOptions) {
  toast(content, {
    ...SNACK_BAR_OPTIONS,
    ...customOptions,
    className: styles.defaultSnackBar,
    bodyClassName: styles.body,
    closeButton: options?.closeIcon ? SnackBarCloseIcon : false,
  });
}

export const SNACK_BAR_OPTIONS: ToastOptions = {
  hideProgressBar: true,
  icon: false,
  autoClose: 100000,
  containerId: 'snackBarDefaultWithProfileType',
  closeButton: false
};

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
function SnackBarCloseIcon(props: CloseButtonProps) {
  return (
    <button className={styles.closeButton} style={{background: 'transparent', padding: 0}} onClick={props.closeToast}>
      <CloseIcon />
    </button>
  );
}
