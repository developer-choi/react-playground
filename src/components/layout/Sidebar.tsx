import React, {DivProp} from 'react';
import styled from 'styled-components';

export interface SidebarProp extends DivProp {

}

/**
 * 웹페이지 처음 로딩시 url에 따른 active된 collapse가 펼쳐져야함.
 * 서브링크 또는 메인링크중에 연관되는 링크가 있으면 active 효과가 있어야함.
 *
 * 또한 라우팅 기본 처리로는 회원목록 페이지 URL이 /user/list/1일 경우,
 * /user/list로 URL치고들어왔을 떄 /user/list/1로 리다이랙트까지 시켜줘야하는데
 * 이 기능과 사이드바 역시 같이 잘 작동해야한다.
 * 회원목록가는 링크를 눌렀는데 Sidebar가 다시 언마운트됬다가 마운트 된다거나 하는 그런 버그는 발생하면안됨.
 */
export default function Sidebar({...rest}: SidebarProp) {

  return (
      <Wrap {...rest}/>
  );
}

const Wrap = styled.div`
`;
