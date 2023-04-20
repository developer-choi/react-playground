import React from 'react';
import Collapsible, {CollapsibleContentProp, CollapsibleHeaderProp} from '@component/atom/forms/Collapsible';
import Button from '@component/atom/element/Button';
import styled from 'styled-components';

// URL: http://localhost:3000/experimental/components/nested-collapsible
export default function Page() {
  return (
    <Collapsible renderHeader={Header} renderContent={Content}>
      내용<br/>
      내용<br/>
      내용<br/>
      내용<br/>
      내용<br/>
      내용<br/>
      내용<br/>
      <Collapsible renderHeader={Header2} renderContent={Content}>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        내용<br/>
        <Collapsible renderHeader={Header3} renderContent={Content}>
          내용<br/>
          내용<br/>
          내용<br/>
          내용<br/>
          내용<br/>
          내용<br/>
          내용<br/>
        </Collapsible>
      </Collapsible>
    </Collapsible>
  );
}

function Header({onClick, collapsed}: CollapsibleHeaderProp) {
  return (
    <Button onClick={onClick}>{collapsed ? '펼치기' : '접기'}</Button>
  );
}

function Header2({onClick, collapsed}: CollapsibleHeaderProp) {
  return (
    <Button onClick={onClick}>{collapsed ? '2단으로 펼치기' : '접기'}</Button>
  );
}

function Header3({onClick, collapsed}: CollapsibleHeaderProp) {
  return (
    <Button onClick={onClick}>{collapsed ? '3단으로 펼치기' : '접기'}</Button>
  );
}

function Content({style, children}: CollapsibleContentProp) {
  return (
    <ContentWrap style={style}>
      {children}
    </ContentWrap>
  );
}

const ContentWrap = styled.div`
  font-size: 16px;
  font-style: italic;
  background-color: lightblue;
`;
