import {toast, ToastOptions} from 'react-toastify';
import Image from 'next/image';
import {DEFAULT_SNACK_BAR_OPTIONS} from '@/components/toast';
import styles from './index.module.scss';

export interface SnackBarProfileProps {
  profileImage: string,
  name: string,
  message: string
}

export function snackBarProfile(profile: SnackBarProfileProps, customOptions?: ToastOptions) {
  toast(<SnackBarProfile {...profile}/>, {
    ...DEFAULT_SNACK_BAR_OPTIONS,
    className: styles.profileSnackBar,
    bodyClassName: styles.body,
    ...customOptions
  });
}

function SnackBarProfile({profileImage, name, message}: SnackBarProfileProps) {
  return (
    <div className={styles.wrap}>
      <Image width={32} height={32} className={styles.profileImage} src={profileImage} alt="Profile Image"/>
      <div className={styles.textWrap}>
        <span className={styles.name}>{name} 선생님</span>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  );
}
