import React, {ComponentPropsWithRef, useCallback, MouseEvent} from 'react';
import classNames from 'classnames';
import styles from './index.module.scss'
import LoadingSpinner from '@/components/element/LoadingSpinner';
import CustomLink, {CustomLinkProps} from '@/components/element/link/CustomLink';

export interface ButtonProps extends Pick<ComponentPropsWithRef<'button'>, UsedProps> {
  size?: ButtonSize; // default 'medium'
  variant?: ButtonVariant; // default 'contained'
  color?: ButtonColor; // default 'primary'
  loading?: boolean | 'mutating' | {
    mutationKey: MutationKey
  };
}

// Doc : https://docs.google.com/document/d/1aEHPwWUlT8nLpzuJwogzQerYawVbWIk8WCMRaxleDaI/edit
export default function Button(props: ButtonProps) {
  const { children, className, type = 'button', loading, size = 'medium', variant = 'contained', color = 'primary', onClick, ...rest } = props;
  const _loading = typeof loading === "boolean" ? loading : false; // TODO 다양한 로딩 타입으로 계산

  const customOnClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (_loading) {
      return;
    }

    onClick?.(event);
  }, [_loading, onClick]);
  
  return (
    <button
      type={type}
      className={classNames(styles.button, {[styles.loading]: _loading}, styles[size], styles[color], styles[variant], className)}
      onClick={customOnClick}
      {...rest}
    >
      {_loading ? <LoadingSpinner className="loading" square={LINE_HEIGHT_BY_SIZE[size]}/> : children}
    </button>
  );
}

export type ButtonLinkProps = CustomLinkProps & Pick<ButtonProps, 'variant' | 'size' | 'color'>;

export function ButtonLink({className, size = 'medium', color = 'primary', variant = 'contained', ...rest}: ButtonLinkProps) {
  return (
    <CustomLink className={classNames(styles.button, styles[size], styles[color], styles[variant], styles.buttonLink, className)} {...rest}/>
  )
}

// 로딩의 크기는 가로세로 모두 line-height만큼만 커져야 전체 버튼사이즈의 변화가 안생김.
const LINE_HEIGHT_BY_SIZE: Record<ButtonSize, number> = {
  medium: 20,
  large: 24
}

// 이거 안하면 버튼 컴포넌트 사용할 때 가능한 props 전체 수백개가 뜨기때문에, 사용하는 props만 설정
type UsedProps = "style" | "className" | "onClick" | 'disabled' | 'children' | 'type';
export type ButtonSize = "medium" | "large";
export type ButtonVariant = "contained" | "outlined";
export type ButtonColor = 'primary' | 'secondary' | string;
type MutationKey = any; // RQ
