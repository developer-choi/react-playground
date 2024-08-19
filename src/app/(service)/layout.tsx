import React, {PropsWithChildren} from 'react';
import AppProvider from '@/components/setting';

export default async function ServiceLayout({children}: PropsWithChildren) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
