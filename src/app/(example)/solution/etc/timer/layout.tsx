import {PropsWithChildren} from 'react';
import ReactQueryProvider from '@/components/setting/ReactQueryProvider';

export default function Layout({children}: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  );
}
