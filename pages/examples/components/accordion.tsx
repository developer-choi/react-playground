import React, {forwardRef, useState} from 'react';
import Accordion, {AccordionContentProp, AccordionHeaderProp} from '@component/atom/Accordion';
import styled from 'styled-components';

export default function Page() {
  const [fruit, setFruit] = useState<'apple' | 'banana' | 'kiwi' | undefined>('kiwi');

  const getHandler = (value: typeof fruit) => {
    return (collapsed: boolean) => {
      if (collapsed) {
        setFruit(undefined);

      } else {
        setFruit(value);
      }
    };
  };

  return (
    <>
      <Accordion collapsed={fruit !== 'apple'} onChange={getHandler('apple')} renderHeader={Header} renderContent={Content}>
        내용1<br/>
        내용1<br/>
        내용1<br/>
        내용1<br/>
        내용1<br/>
      </Accordion>

      <Accordion collapsed={fruit !== 'banana'} onChange={getHandler('banana')} renderHeader={Header} renderContent={Content}>
        내용2<br/>
        내용2<br/>
        내용2<br/>
        내용2<br/>
        내용2<br/>
      </Accordion>

      <Accordion collapsed={fruit !== 'kiwi'} onChange={getHandler('kiwi')} renderHeader={Header} renderContent={Content}>
        내용3<br/>
        내용3<br/>
        내용3<br/>
        내용3<br/>
        내용3<br/>
      </Accordion>
    </>
  )
}

function Header({collapsed, onClick}: AccordionHeaderProp) {
  return (
    <HeaderWrap onClick={onClick}>
      {collapsed ? '열기' : '닫기'}
    </HeaderWrap>
  );
}

const Content = forwardRef<any, AccordionContentProp>(function Content({style, children}, ref) {
  return (
    <ContentWrap ref={ref} style={style}>
      {children}
    </ContentWrap>
  );
});

const HeaderWrap = styled.div`
  background: yellow;
`;

const ContentWrap = styled.div`
  background: mediumpurple;
`;
