import React, {PropsWithChildren} from 'react';
import AppProvider from '@/components/setting/AppProvider';
import ServiceLayoutHeader from '@/components/layout/ServiceLayoutHeader';

export default async function ServiceLayout({children}: PropsWithChildren) {
  return (
    <AppProvider>
      <ServiceLayoutHeader/>
      <div style={{padding: 16}}>
        {children}
      </div>
    </AppProvider>
  );
}
