import React, {PropsWithChildren, ReactNode} from 'react';
import {isMobileOnBothSide} from '@/utils/extend/library/next';

interface ServiceLayoutProps {
  pc: ReactNode;
  mobile: ReactNode;
}

/** 방법 2. Parallel Routes로 하는 방법 (전통적인 방법)
 *
 * PC / Mobile 마크업 코드를 완전히 분리하기 때문에,
 * Conditional 하게 2개 코드 한 파일에 넣는 방식보다 파일 수가 2배로 늘어남.
 * 레이아웃 종류가 많거나 복잡한 경우 추천
 */
export default async function ServiceLayout({pc, mobile}: ServiceLayoutProps) {
  const isMobile = isMobileOnBothSide();

  return (
    <AnotherAppProvider>
      {isMobile ? mobile : pc}
    </AnotherAppProvider>
  );
}

function AnotherAppProvider({children}: PropsWithChildren) {
  return children;
}
