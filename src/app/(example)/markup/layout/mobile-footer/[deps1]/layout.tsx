'use client';

import {ComponentPropsWithoutRef, FunctionComponent, PropsWithChildren} from 'react';
import ActiveLink, {ActiveLinkProps, useCheckHrefIsActive} from '@/components/element/link/ActiveLink';
import styles from './page.module.scss';
import {COLOR} from '@/styles/color';
import IcAnnounce from '@/components/icon/IcAnnounce';

export default function Layout({children}: PropsWithChildren) {
  const enableActive: ActiveLinkProps['enableActive'] = {
    mode: 'startsWith',
    className: styles.active,
  };

  return (
    <div className={styles.wrap}>
      {children}
      <footer className={styles.footer}>
        <NavItem href="/markup/layout/mobile-footer/product" enableActive={enableActive} icon={IcAnnounce} text="Product"/>
        <NavItem href="/markup/layout/mobile-footer/event" enableActive={enableActive} icon={IcAnnounce} text="Event"/>
        <NavItem href="/markup/layout/mobile-footer/community" enableActive={enableActive} icon={IcAnnounce} text="Community"/>
        <NavItem href="/markup/layout/mobile-footer/mypage" enableActive={enableActive} icon={IcAnnounce} text="Mypage"/>
      </footer>
    </div>
  );
}


interface NavItemProps {
  href: string;
  text: string;
  enableActive: Required<ActiveLinkProps['enableActive']>;
  icon: FunctionComponent<ComponentPropsWithoutRef<'svg'>>;
}

function NavItem({enableActive, href, text, icon: Icon}: NavItemProps) {
  const isActive = useCheckHrefIsActive(href, enableActive);

  return (
    <ActiveLink href={href} className={styles.navLink} enableActive={enableActive}>
      <Icon fill={isActive ? COLOR.brand.primary : undefined}/>
      <span className={styles.navText}>{text}</span>
    </ActiveLink>
  );
}