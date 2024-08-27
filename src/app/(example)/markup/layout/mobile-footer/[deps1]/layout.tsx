'use client';

import {ComponentPropsWithoutRef, FunctionComponent, PropsWithChildren} from 'react';
import ActiveLink, {ActiveLinkProps, useCheckHrefIsActive} from '@/components/element/link/ActiveLink';
import styles from './page.module.scss';
import {COLOR} from '@/styles/color';
import IcAnnounce from '@/components/icon/IcAnnounce';
import ModalProvider from '@/components/setting/ModalProvider';

export default function Layout({children}: PropsWithChildren) {
  return (
    <ModalProvider>
      <div className={styles.wrap}>
        {children}
        <footer className={styles.footer}>
          <NavItem href="/markup/layout/mobile-footer/product" activeMode="startsWith" icon={IcAnnounce} text="Product"/>
          <NavItem href="/markup/layout/mobile-footer/event" activeMode="startsWith" icon={IcAnnounce} text="Event"/>
          <NavItem href="/markup/layout/mobile-footer/community" activeMode="startsWith" icon={IcAnnounce} text="Community"/>
          <NavItem href="/markup/layout/mobile-footer/mypage" activeMode="startsWith" icon={IcAnnounce} text="Mypage"/>
        </footer>
      </div>
    </ModalProvider>
  );
}


interface NavItemProps {
  href: string;
  text: string;
  activeMode: Required<ActiveLinkProps['mode']>;
  icon: FunctionComponent<ComponentPropsWithoutRef<'svg'>>;
}

function NavItem({activeMode, href, text, icon: Icon}: NavItemProps) {
  const isActive = useCheckHrefIsActive(href, activeMode);

  return (
    <ActiveLink href={href} className={styles.navLink} mode="startsWith">
      <Icon fill={isActive ? COLOR.brand.primary : undefined}/>
      <span className={styles.navText}>{text}</span>
    </ActiveLink>
  );
}
