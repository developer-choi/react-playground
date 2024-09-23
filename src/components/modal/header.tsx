import styles from './header.module.scss';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, MouseEventHandler } from 'react';
import CloseIcon from '@/components/icon/CloseIcon';
import Image from 'next/image';

export interface DefaultModalHeaderProps extends ModalHeaderProps {
  onClose?: MouseEventHandler; // default undefined, 넣고싶으면 close callback 전달해야.
}

/**
 * 타이틀만 나오거나,
 * 타이틀 + X버튼 나오거나.
 *
 * Alert, Confirm을 제외한 나머지 모달들은 모달 컴포넌트 안에서 X버튼 노출할지 결정하고,
 * Alert Confirm에 한해서는 visibleHeaderClose props를 통해 외부에서 X버튼을 노출할지 결정할것.
 *
 * 사유는, Alert Confirm이 아닌 나머지 모달은 모달의 기능이 고정적이지만,
 * Alert Confirm은 버튼의 onClick에 무엇을 전달할지 모르다보니 규칙을 이렇게 결정함.
 */
export function DefaultModalHeader({ children, onClose, ...rest }: DefaultModalHeaderProps) {
  return (
    <ModalHeader {...rest}>
      <h3 className={styles.title}>{children}</h3>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </ModalHeader>
  );
}

export interface ProfileModalHeaderProps extends ModalHeaderProps {
  profileImage: string;
  teacherName: string;
  hashtags: string[];
}

export function ProfileModalHeader({ profileImage, teacherName, hashtags }: ProfileModalHeaderProps) {
  return (
    <ModalHeader className={styles.profileHeader}>
      <Image src={profileImage} alt="Profile Image" className={styles.profileImage} width={80} height={80} />
      <div>
        <div className={styles.title}>{teacherName}</div>
        <div className={styles.hashtag}>{hashtags.join(' ')}</div>
      </div>
    </ModalHeader>
  );
}
/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
// 일단 header 태그의 전체 props를 확장함으로써 혹시모를 커스텀 대비
type ModalHeaderProps = ComponentPropsWithoutRef<'header'>;

// 헤더 종류 어떤게 오더라도 헤더컨테이너는 공통적이어야합니다. 패딩은 안바뀌겠지 ㅇㅇ.
function ModalHeader({ className, ...rest }: ModalHeaderProps) {
  return <header className={classNames(styles.defaultHeader, className)} {...rest} />;
}
