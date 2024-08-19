import {PropsWithChildren} from 'react';
import AppProvider from '@/components/setting';

export default function Layout({children}: PropsWithChildren) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
}
