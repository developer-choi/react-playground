import React, {InputProp} from 'react';
import styled from 'styled-components';

export interface InputFileExtendProp extends InputProp {

}

/**
 * 도렌 어드민에서,
 * 배너만들자마자 다시 만들려고 파일선택했더니 onChangeFile자체가 호출이안되던거. 왜그랬을까?
 */
export default function InputFileExtend({...rest}: InputFileExtendProp) {

  return (
      <Wrap {...rest}/>
  );
}

const Wrap = styled.div`
`;
