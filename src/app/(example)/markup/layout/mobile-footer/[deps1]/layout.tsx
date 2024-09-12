'use client';

import {ComponentPropsWithoutRef, FunctionComponent, PropsWithChildren} from 'react';
import ActiveLink, {ActiveLinkProps, useCheckHrefIsActive} from '@/components/element/link/ActiveLink';
import styles from './page.module.scss';
import {COLOR} from '@/styles/color';
import BoardIcon from '@/components/icon/BoardIcon';

export default function Layout({children}: PropsWithChildren) {
  return (
    <div className={styles.wrap}>
      {children}
      <footer className={styles.footer}>
        <NavItem href="/markup/layout/mobile-footer/product" activeMode="startsWith" icon={BoardIcon} text="Product"/>
        <NavItem href="/markup/layout/mobile-footer/event" activeMode="startsWith" icon={BoardIcon} text="Event"/>
        <NavItem href="/markup/layout/mobile-footer/community" activeMode="startsWith" icon={BoardIcon}
                 text="Community"/>
        <NavItem href="/markup/layout/mobile-footer/mypage" activeMode="startsWith" icon={BoardIcon} text="Mypage"/>
      </footer>
    </div>
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
