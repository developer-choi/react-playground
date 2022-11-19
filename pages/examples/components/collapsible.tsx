import React from 'react';
import BasicCollapsible from '@component/atom/BasicCollapsible';

export default function Page() {
  return (
    <>
      <BasicCollapsible>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
      </BasicCollapsible>
      <BasicCollapsible initialCollapsed={false}>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
      </BasicCollapsible>
    </>
  );
}
