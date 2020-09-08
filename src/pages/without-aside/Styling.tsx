import React, {ComponentProps} from 'react';
import styled from 'styled-components';
import H1 from '../../components/design/H1';
import H2 from '../../components/design/H2';
import {CodeViewer} from '../../components/basic-extends/CodeViewer';

export default function Styling() {

  return (
      <div>
        <H1>styled-components 스타일링</H1>
        <Child style={{backgroundColor: 'red'}}>
          style property로 직접 스타일링.
          이 경우, 자식 컴포넌트에서 style property를 대입해야한다.
        </Child>
        <StyledChild>
          styled-components로 확장해서 스타일링.
          이 경우, 자식 컴포넌트에서 className property를 대입해야한다.
        </StyledChild>

        그러므로, styled-components기반 컴포넌트를 구현하려면,
        style prop, className prop을 자식컴포넌트에 대입하는 방식으로 구현해야한다.
        그래야 자식컴포넌트에서 한 스타일을 표현하면서 동시에 부모에서 넘겨받은 스타일로 확장이 가능하기 때문이다.

        <H2>Case 1. 기본 styling을 style prop으로 하는경우</H2>
        <a href="https://ko.reactjs.org/docs/dom-elements.html#style">일단 style prop을 주요 스타일링 수단으로 사용하는것은 좋지못하다고 공식문서에 나와있으므로</a>
        이 케이스는 지양하도록 한다.

        <CodeViewer>
          {codeString1}
        </CodeViewer>
        만약에 그 주의사항을 무시하고 한다면, 이런식으로 진행이 될것 같다.

        <CodeViewer>
          {codeString2}
        </CodeViewer>

        react-native에서 했던 실수인데, 기존 스타일을과 부모에서 넘겨준 style을 둘 다 신경쓰지않으면,
        부모에서 style prop을 넘기는 순간 기존 스타일이 적용 안되고 부모에서 넘겨준 style만 적용되는 버그가 생긴다.

        <CodeViewer>
          {codeString3}
        </CodeViewer>

        이것이 현재 내가 생각하는 모범사례고, 나는 className이 아닌 styled-components로 스타일링 하기 때문에
        className은 rest에 포함되어 spread되어도 상관없지만,
        style은 동적으로 주려고 할 때 style prop과 함께 적용되야 하므로 저렇게 작성했다.
        그러나 타입에러가 나는것은 어떻게 해결할지 더 나은 방법이 있는지 찾아봐야하는 상황.
      </div>
  );
}

const codeString1 = `const prevStyles = {
  fontWeight: 'bold'
};

function Child({style, children, className}: ComponentProps<'div'>) {

  return (
      <div style={{...prevStyles, ...style}} className={className}>
        {children}
      </div>
  )
}
`;

const codeString2 = `const prevStyle = {
  fontWeight: 'bold'
};

function Child({children, ...rest}: ComponentProps<'div'>) {

  return (
      <div style={prevStyle} {...rest}>
        {children}
      </div>
  )
}`;

const codeString3 = `const ChildStyle = styled.div\`
  font-weight: bold;
\`;

interface ChildProp extends ComponentProps<'div'> {
  
}

function Child({style, ...rest}: ChildProp) {

  const dynamicStyle = (2 > 1) ? {fontWeight: 'bold'} : {fontWeight: 'normal'};
  
  return (
      <ChildStyle style={{...dynamicStyle, ...style}} {...rest}/>
  )
}`;

const ChildStyle = styled.div`
  font-weight: bold;
`;

interface ChildProp extends ComponentProps<'div'> {

}

function Child({style, ...rest}: ChildProp) {

  const dynamicStyle = (2 > 1) ? {fontWeight: 'bold'} : {fontWeight: 'normal'};

  return (
      <ChildStyle style={{...dynamicStyle, ...style}} {...rest}/>
  )
}

const StyledChild = styled(Child)`
  background-color: ${props => props.theme.colors.reactBlue};
`;
