'use client';

import React from 'react';
import LinkOrAnchor from '@/components/element/link/LinkOrAnchor';

// URL: http://localhost:3000/solution/etc/link-or-anchor
export default function Page() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
      <LinkOrAnchor href="https://www.naver.com/">
        https://www.naver.com
      </LinkOrAnchor>
      <LinkOrAnchor href="http://localhost:3000">
        http://localhost:3000
      </LinkOrAnchor>
      <LinkOrAnchor href="http://localhost:3000/solution/etc/link-or-anchor">
        http://localhost:3000/solution/etc/link-or-anchor
      </LinkOrAnchor>
      <LinkOrAnchor href="/solution/etc/link-or-anchor">
        /solution/etc/link-or-anchor
      </LinkOrAnchor>
      <LinkOrAnchor href={undefined}>
        undefined href
      </LinkOrAnchor>
    </div>
  );
}
