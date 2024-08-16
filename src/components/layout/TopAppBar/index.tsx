'use client';

import styles from './index.module.scss';
import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import IcBackspace from '@/components/icon/IcBackspace';

export interface TopAppBarProps {
  position?: 'sticky' | 'static'; // default로 mobile은 sticky, pc는 static입니다.
  titleAlign?: 'left' | 'center'; // 대부분의 경우 제목 중앙정렬이지만 좌측정렬이 쓰이는곳도 있습니다.
  enableBackspace?: boolean;
  rightRender?: ReactElement; // 앱상단바 우측끝에 노출되는 요소이며, 높이를 강제로 24px로 제한합니다. (디자인 시스템 규정)

  className?: string;
  style?: CSSProperties;
}

/**
 * 컨테이너 너비만큼 늘어나도록 구현되었습니다.
 */
export default function TopAppBar(props: PropsWithChildren<TopAppBarProps>) {
  const { position, titleAlign = 'center', enableBackspace = true, rightRender, children, ...rest } = props;
  const isMobile = true;
  const positionWithDefault = position ? position : isMobile ? 'sticky' : 'static';
  const { back } = useRouter();

  return (
    <div className={classNames(styles.container, styles[positionWithDefault])} {...rest}>
      {enableBackspace ? <IcBackspace onClick={back} /> : <div className={styles.empty} />}
      <span className={styles.title}>
        <span className={styles[titleAlign]}>{children}</span>
      </span>
      {rightRender ? rightRender : <div className={styles.empty} />}
    </div>
  );
}
