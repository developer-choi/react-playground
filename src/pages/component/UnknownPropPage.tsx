import React from 'react';
import styled from 'styled-components';
import {InputExtendProp} from '../../components/extend/input-extend';
import InputExtend from '../../components/extend/InputExtend';

export default function UnknownPropPage() {

  /**
   * 1. React does not recognize the `removeRightRadius`
   * 2. Received `true` for a non-boolean attribute `removeleftradius`.
   *
   * prop관련 유명한 react 경고메시지중 2개.
   * https://ko.reactjs.org/warnings/unknown-prop.html
   * https://styled-components.com/docs/basics#coming-from-css
   *
   * 각 팀이 알려지지않은 prop (= 개발자가 직접만든 prop)을 dom attribute에 추가하고 추가하지않기 위해 노력했었구나.
   * 근데 잘 모르겠다 에러해결이 안돼 작동은되는데.
   */

  return (
      <Wrap>
        <BasicInput removeLeftRadius={true}/>
        <BasicInput2 removeLeftRadius={true}/>
      </Wrap>
  );
}

interface BasicInputProp extends InputExtendProp {
  removeLeftRadius?: boolean;
  removeRightRadius?: boolean;
}

function BasicInput({removeLeftRadius, removeRightRadius, ...rest}: BasicInputProp) {

  return (
      <InputStyle removeLeftRadius={removeLeftRadius} removeRightRadius={removeRightRadius} {...rest}/>
  );
}

function BasicInput2({removeLeftRadius, removeRightRadius, ...rest}: BasicInputProp) {

  return (
      <InputStyle2 removeleftradius={removeLeftRadius} removerightradius={removeRightRadius} {...rest}/>
  );
}

const InputStyle = styled(InputExtend)<{removeLeftRadius?: boolean, removeRightRadius?: boolean}>`
  border: 1px solid ${props => props.theme.main};
  padding: 5px 10px;
  
  border-top-left-radius: ${props => props.removeLeftRadius ? 0 : 20}px;
  border-bottom-left-radius: ${props => props.removeLeftRadius ? 0 : 20}px;
  
  border-top-right-radius: ${props => props.removeRightRadius ? 0 : 20}px;
  border-bottom-right-radius: ${props => props.removeRightRadius ? 0 : 20}px;
`;

const InputStyle2 = styled(InputExtend)<{removeleftradius?: boolean, removerightradius?: boolean}>`
  border: 1px solid ${props => props.theme.main};
  padding: 5px 10px;
  
  border-top-left-radius: ${props => props.removeleftradius ? 0 : 20}px;
  border-bottom-left-radius: ${props => props.removeleftradius ? 0 : 20}px;
  
  border-top-right-radius: ${props => props.removerightradius ? 0 : 20}px;
  border-bottom-right-radius: ${props => props.removerightradius ? 0 : 20}px;
`;


const Wrap = styled.div`
`;
