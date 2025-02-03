import AppProvider from '@/components/setting/AppProvider';
import {LayoutProps} from '@/types/declaration/next';

export default function Layout({children}: LayoutProps) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
