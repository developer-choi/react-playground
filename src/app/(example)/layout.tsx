import AppProvider from '@/components/setting/AppProvider';
import {LayoutProps} from '@forworkchoe/core/utils';

export default function Layout({children}: LayoutProps) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
