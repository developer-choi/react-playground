import {PropsWithChildren} from 'react';
import '@/utils/styles/reset.css';
import '@/utils/styles/global.css';

export default function Layout({children}: PropsWithChildren) {
  return (
    <AnyApplicationProvider>
      {children}
    </AnyApplicationProvider>
  );
}

function AnyApplicationProvider({children}: PropsWithChildren) {
  return children;
}
