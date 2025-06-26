import {CloseButtonProps, cssTransition, toast, ToastOptions} from 'react-toastify';
import CloseIcon from '@/components/icon/CloseIcon';
import styles from './index.module.scss';

export interface DefaultSnackBarOptions {
  closeIcon?: boolean;
  href?: string;
}

export function snackBar(content: string, options?: DefaultSnackBarOptions, customOptions?: ToastOptions) {
  toast(content, {
    ...DEFAULT_SNACK_BAR_OPTIONS,
    className: styles.defaultSnackBar,
    bodyClassName: styles.body,
    closeButton: options?.closeIcon ? SnackBarCloseIcon : false,
    ...customOptions,
  });
}

export const DEFAULT_SNACK_BAR_OPTIONS: ToastOptions = {
  hideProgressBar: true,
  icon: false,
  autoClose: 1000,
  containerId: 'snackBarDefaultWithProfileType',
  closeButton: false,
  transition: cssTransition({
    enter: styles.enter,
    exit: styles.exit,
    collapse: false
  })
};

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
function SnackBarCloseIcon(props: CloseButtonProps) {
  return (
    <button className={styles.closeButton} style={{background: 'transparent', padding: 0}} onClick={props.closeToast}>
      <CloseIcon fill="white" />
    </button>
  );
}
