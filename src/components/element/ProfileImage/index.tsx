'use client';

import {ComponentPropsWithoutRef} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import {CustomImage} from '@forworkchoe/core/components';

export interface ProfileImageProps extends ComponentPropsWithoutRef<'div'> {
  size: 'small' | 'medium' | 'large'; // 디자인 시스템에 정의된 프로필 이미지 사이즈 종류
  src: string | undefined; // alt는 '프로필 이미지' 예정
}

export default function ProfileImage({size, src, style, className, ...rest}: ProfileImageProps) {
  return (
    <div style={style} className={classNames(styles.container, styles[size], className)} {...rest}>
      <CustomImage className={styles.image} src={src} width={SIZE[size]} height={SIZE[size]} alt="Profile Thumbnail Image" fallback={{type: 'default-404'}}/>
    </div>
  );
}

const SIZE: Record<ProfileImageProps['size'], number> = {
  large: 120,
  medium: 60,
  small: 40
};