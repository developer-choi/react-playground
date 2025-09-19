import React, {PropsWithChildren} from 'react';
import {isMobileOnBothSide} from '@/utils/extend/library/next';
import {LayoutProps} from '@forworkchoe/core/utils';

/**
 * 방법 1. Parallel Routes 없이 Conditional 로직으로 분기 태우는 경우
 *
 * PC / Mobile 마크업 코드를 하나의 파일에 다 집어넣기때문에,
 * 정석 방법인 parallel routes에 비해 파일 수가 2배로 적음.
 * PC / Mobile 레이아웃 종류가 적고, 간단한 경우에만 추천
 */
export default async function ServiceLayout({children}: LayoutProps) {
  return (
    <PrivateLayout>
      {children}
    </PrivateLayout>
  );
}

/*************************************************************************************************************
 * 아래는 다른파일이라고 가정 (private)/layout.tsx
 *************************************************************************************************************/

/**
 * Service Layout 밑에 private / public 등 특정 종류의 레이아웃에서 직접 분기처리
 */
function PrivateLayout({children}: PropsWithChildren) {
  const isMobile = isMobileOnBothSide();

  if (isMobile) {
    return <MobilePrivateLayout>{children}</MobilePrivateLayout>;

  } else {
    return <PcPrivateLayout>{children}</PcPrivateLayout>;
  }
}

function PcPrivateLayout({children}: PropsWithChildren) {
  return children;
}

function MobilePrivateLayout({children}: PropsWithChildren) {
  return children;
}
