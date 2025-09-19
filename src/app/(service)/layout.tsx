import React from 'react';
import AppProvider from '@/components/setting/AppProvider';
import ServiceLayoutHeader from '@/components/layout/ServiceLayoutHeader';
import {LayoutProps} from '@forworkchoe/core/utils';

export default async function ServiceLayout({children}: LayoutProps) {
  return (
    <AppProvider>
      <ServiceLayoutHeader/>
      <div style={{padding: 16}}>
        {children}
      </div>
    </AppProvider>
  );
}
