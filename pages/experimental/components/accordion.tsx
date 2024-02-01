import React, {forwardRef, useState} from "react";
import Accordion, {AccordionContentProp, AccordionHeaderProp} from "@component/atom/Accordion";
import styled from "styled-components";

// URL: http://localhost:3000/experimental/components/accordion
export default function Page() {
  const [fruit, setFruit] = useState<Fruit | undefined>("kiwi");

  const additionalProp: AdditionalProp = {
    name: "additional-prop"
  };

  const getHandler = (value: typeof fruit) => {
    return (collapsed: boolean) => {
      if (collapsed) {
        setFruit(undefined);
      } else {
        setFruit(value);
      }
    };
  };

  /**
   * 렌더링 될때마다 새로 할당되기때문에 버그가 발생함.
   * 그러므로 content를 custom할거면 useMemo로 감싸던가 이 페이지컴포넌트 바깥으로 뺴던가 해야함.
   */
  const bugContent = forwardRef<any, AccordionContentProp<AdditionalProp>>(function Content({style, children}, ref) {
    return (
      <ContentWrap ref={ref} style={style}>
        {children}
      </ContentWrap>
    );
  });

  return (
    <>
      <Accordion additionalProps={additionalProp} collapsed={fruit !== "apple"} onChange={getHandler("apple")} renderHeader={Header} renderContent={Content}>
        내용1
        <br />
        내용1
        <br />
        내용1
        <br />
        내용1
        <br />
        내용1
        <br />
      </Accordion>

      <Accordion additionalProps={additionalProp} collapsed={fruit !== "banana"} onChange={getHandler("banana")} renderHeader={Header} renderContent={Content}>
        내용2
        <br />
        내용2
        <br />
        내용2
        <br />
        내용2
        <br />
        내용2
        <br />
      </Accordion>

      <Accordion additionalProps={additionalProp} collapsed={fruit !== "kiwi"} onChange={getHandler("kiwi")} renderHeader={Header} renderContent={bugContent}>
        내용3
        <br />
        내용3
        <br />
        내용3
        <br />
        내용3
        <br />
        내용3
        <br />
      </Accordion>
    </>
  );
}

type Fruit = "apple" | "banana" | "kiwi";

interface AdditionalProp {
  name: string;
}

function Header({collapsed, onClick, additionalProps: {name}}: AccordionHeaderProp<AdditionalProp>) {
  return (
    <HeaderWrap onClick={onClick}>
      {name} {collapsed ? "열기" : "닫기"}
    </HeaderWrap>
  );
}

const Content = forwardRef<any, AccordionContentProp<AdditionalProp>>(function Content({style, children, additionalProps: {name}}, ref) {
  return (
    <ContentWrap ref={ref} style={style}>
      {name} {children}
    </ContentWrap>
  );
});

const HeaderWrap = styled.div`
  background: yellow;
`;

const ContentWrap = styled.div`
  background: mediumpurple;
`;
