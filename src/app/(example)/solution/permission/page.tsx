'use client';

import {hasPermission, Permission, ReadPermission} from '@/utils/extend/permission';
import {Collapse} from 'react-collapse';
import {useToggle} from '@/utils/extend/library/react';
import styles from './page.module.scss';

// URL: http://localhost:3000/solution/permission
// Doc: [Permission Algorithm] https://docs.google.com/document/d/1Adprw6cjDQh2suSOCBuD2UuH6sIZjbyHa-w5sk9gDWs/edit?tab=t.0
export default function Page() {
  // 로그인 성공했을 때 받아와서 next-auth 세션에 집어넣고, Server Side 혹은 Client Side에서 체크하면됨.
  const userPermissions: Permission[] = [
    'NOTICE:ALL',
    'DASHBOARD:ALL'
  ];

  const sidebarLinks = getAvailableSidebarLinks(INITIAL_SIDEBAR_LINKS, userPermissions);

  return (
    <nav className={styles.wrap}>
      {sidebarLinks.map((sidebar, index) => (
        <SidebarLinkItem key={index} item={sidebar}/>
      ))}
    </nav>
  );
}

function SidebarLinkItem({item}: {item: SidebarLink}) {
  const {bool, toggle} = useToggle();

  return (
    <div className={styles.accordion}>
      <div className={styles.parent} onClick={toggle}>{item.name}</div>
      <Collapse isOpened={bool}>
        {item.children.map(item => (
          <div key={item.href} className={styles.sub}>{item.name}</div>
        ))}
      </Collapse>
    </div>
  )
}

// 기본적으로 이런거 가능하고,
const NOTICE: SidebarLink = {
  name: '공지사항',
  children: [
    {
      name: '선생님',
      href: '/notice/teacher',
      permission: 'NOTICE.TEACHER:READ'
    },
    {
      name: '학생',
      href: '/notice/student',
      permission: 'NOTICE.STUDENT:READ'
    },
  ],
};

const DASHBOARD: SidebarLink = {
  name: '대시보드',
  children: [
    {
      name: '결제',
      href: '/dashboard/payment',
      permission: 'DASHBOARD.PAYMENT:READ'
    },
    {
      name: '커뮤니티',
      href: '/dashboard/community',
      permission: 'DASHBOARD.COMMUNITY:READ'
    },
  ],
};

// 굳이 권한 계층에 맞게 사이드바를 안만들어도 됨. 어차피 이 밑에 권한없는거 안나올거니까.
const SHORTCUTS: SidebarLink = {
  name: '즐겨찾기',
  children: [
    {
      name: '결제',
      href: '/dashboard/payment',
      permission: 'DASHBOARD.PAYMENT:READ'
    },
    {
      name: '선생님',
      href: '/notice/teacher',
      permission: 'NOTICE.TEACHER:READ'
    },
    // 권한 계층구조가 3뎁스 4뎁스 까지 있어도, 사이드바는 2뎁스로 다 펼쳐서 뿌려도 아무런 문제가 없음.
    // {
    //   name: '4뎁스짜리 깊은 링크',
    //   href: '/1depth/2depth/3depth/4depth',
    //   permission: '1depth.2depth.3depth.4depth:READ'
    // },
  ],
};

const INITIAL_SIDEBAR_LINKS: SidebarLink[] = [
  NOTICE,
  DASHBOARD
];

/**
 * @param sidebarLinks 사이드바 링크 배열
 * @param grantedPermissions 유저가 갖고있는 권한
 * @returns 해당 권한으로 접근할 수 있는 사이드바 링크 배열, 자식배열이 없으면 부모 요소 자체가 없어짐.
 */
function getAvailableSidebarLinks(sidebarLinks: SidebarLink[], grantedPermissions: Permission[]): SidebarLink[] {
  return sidebarLinks.reduce((a, b) => {
    const children = b.children.filter(({permission}) => hasPermission(permission, grantedPermissions));

    if (children.length) {
      a.push({
        name: b.name,
        children
      });
    }

    return a;
  }, [] as SidebarLink[]);
}

interface SidebarLink {
  name: string;
  children: SidebarChildren[]; // 하위 배열에 모두 접근할 수 없으면 부모 계층도 미노출되야함.
}

interface SidebarChildren {
  name: string;
  permission: ReadPermission; // 이 페이지에 접근할 수 있는 최소한의 GET 권한
  href: string;
}
