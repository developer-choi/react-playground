import React, {InputProp} from 'react';
import styled from 'styled-components';

export interface InputFileExtendProp extends InputProp {

}

/**
 * 도렌 어드민에서,
 * 배너만들자마자 다시 만들려고 파일선택했더니 onChangeFile자체가 호출이안되던거. 왜그랬을까?
 * input type file 초기화 하는 방법이 뭘까.
 * 그때 모달을 띄우고 닫고 할 때 꼬박 v-show처럼 처리했었는데 이 버그때문에 v-if처럼 아예 언마운트하고 새로 마운트하는걸로 구현했었음...
 * 이러면 react쓰는 의미가없는데.
 */
export default function InputFileExtend({...rest}: InputFileExtendProp) {

  return (
      <Wrap {...rest}/>
  );
}

const Wrap = styled.div`
`;
