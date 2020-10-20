import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {FlexDirectionColumn} from './src/utils/style';

export default function Layout() {

    return (
        <>
          <Header/>
          <Section/>
        </>
    );
}

function Header() {

  return (
      <HeaderStyle/>
  )
}

function Section() {

  const [boxHeight, setBoxHeight] = useState(0);

  useEffect(() => {

    setTimeout(() => {
      setBoxHeight(1000);
    }, 2000);

  }, []);

  return (
      <SectionStyle>
        <MaxHorizontalWrap>
          <InnerSectionWrap childPadding>
            <SectionHeader>
              <H1Style>페이지 타이틀</H1Style>
            </SectionHeader>
            <SectionContent>
              <H2Style style={{marginBottom: 10}}>Flex기반 레이아웃 예제</H2Style>
              <ol>
                <li>헤더는 스크롤 시 상단 고정</li>
                <li>섹션 높이가 짧으면 Footer는 하단고정</li>
                <li>섹션 높이가 길어도 Footer는 늘어난 섹션 밑에 배치되야함.</li>
              </ol>
              <Box style={{height: boxHeight}}/>
            </SectionContent>
          </InnerSectionWrap>
          <GridWrap>
            <InnerSectionWrap>
              <span>{`<section>태그 보다는 그 안에 오는 요소에 padding을 주는것이 위처럼 꽉찬 내용 만들때도 편하고, 아래처럼 조각난 형태 만들기도 편하다.`}</span>
              <Box style={{height: 400, marginTop: 20}}/>
            </InnerSectionWrap>
            <RightWrap>
              <InnerSectionWrap/>
              <InnerSectionWrap/>
            </RightWrap>
          </GridWrap>
        </MaxHorizontalWrap>
      </SectionStyle>
  )
}

function Footer() {

  return (
      <FooterStyle/>
  )
}

/* style.ts에 있으면 레이아웃 잡기 편한 코드 */
const HEADER_SIZE = 130;
const DISTANCE_HEADER_SECTION_FOOTER = 20;
const INNER_SECTION_PADDING = 20;

const MaxHorizontalWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const InnerSectionWrap = styled.div<{childPadding?: boolean}>`
  border-radius: 15px;
  border: 1px solid lightgray;
  background-color: white;
  
  ${props => props.childPadding ? css`
    > * {
      padding: ${INNER_SECTION_PADDING}px;
    }
  ` :
    css`
    padding: ${INNER_SECTION_PADDING}px;
  `}
`;
/*****************************************/

const HeaderStyle = styled.header`
  position: fixed;
  width: 100%;
  height: ${HEADER_SIZE}px;
  background-color: lightgreen;
  z-index: 10; //fixed라고 해서 모든거 위에 오는거 아니다. 그래서 필요함.
`;

const SectionStyle = styled.section`
  margin-top: ${HEADER_SIZE + DISTANCE_HEADER_SECTION_FOOTER}px;
  margin-bottom: ${DISTANCE_HEADER_SECTION_FOOTER}px;
`;

const FooterStyle = styled.footer`
  margin-top: auto;
  background-color: lightpink;
  height: 100px;
  flex-shrink: 0;
`;

const SectionHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const H1Style = styled.h1`
  font-size: 30px;
`;

const H2Style = styled.h2`
  font-size: 25px;
`;

const SectionContent = styled.div`

  > ol {
    margin-bottom: 20px;
    
    > li {
      font-size: 16px;
      margin-top: 5px;
    }
  }
`;

const Box = styled.div`
  background-color: lightsalmon;
  transition: 1s;
`;

const GridWrap = styled.div`
  display: flex;
  margin-top: 20px;

  > * {
    width: 50%;
  }
  
  > :first-child {
    margin-right: 20px;
  }
`;

const RightWrap = styled(FlexDirectionColumn)`
  
  > * {
    height: 50%;
  }
  
  >:first-child {
    margin-bottom: 20px;
  }
`;
