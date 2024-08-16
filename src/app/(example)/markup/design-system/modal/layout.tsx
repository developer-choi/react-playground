import {PropsWithChildren} from 'react';
import dynamic from 'next/dynamic';
const ModalProvider = dynamic(() => import('@/components/modal/ModalProvider'), {ssr: false});

export default function Layout({children}: PropsWithChildren) {
  // 원래는 이게 Service Layout에 들어가야함.
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
