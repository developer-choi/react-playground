import React, {ComponentProps} from 'react';
import styled from 'styled-components';

/**
 * 먼저 내가 만들려던 Sidebar는,
 * 다른 사이드바 처럼 페이지 레이아웃 왼쪽에 고정(fixed)되어있고,
 * 맨위 로고있고 그 아래에 collapsible item들 쭉 있으며,
 * 하위 링크가 있다면 item 클릭시 이동되지는 않고 대신 하위링크들이 담긴 아코디언이 펼쳐지고,
 * 하위링크가 없다면 item 클릭시 곧바로 이동되는거였음.
 */

/**
 * :hover한 하위링크 / 상위링크에 맞는 스타일을 적용해야하고,
 * :hover만 스타일넣을지 :active도 넣을지 이부분도 햇갈렸고, (아직 스타일링 어설픔)
 * 현재와 일치되는 상위링크 / 하위링크 강조표시도 해야하고,
 * 상위링크간 간격을 벌려주고 싶었고, 상위링크 - 하위링크간 간격을 벌려주고싶었으나,
 *    펼치지 않은 상태에서 상위-하위링크간 간격이, 상위-상위링크간 간격과 영향을 줬음. (margin은 자식에 적용된 margin이 부모간 margin에도 적용되는 특징이 있음)
 *
 * 그리고 Sidebar 최상위에 레이아웃관련 스타일 속성이 너무많아서, 정작 저걸 다른 컴포넌트에서 돌려쓸 수 있을지도 모르겠고,
 * Sidebar 컴포넌트 인터페이스가 처음에 너무 별로였음. 그래서 계속 개선되어오긴했음. 다른 사이드바 인터페이스는 어떨까..
 *
 * 또한, 하위링크가 없으면 상위링크는 눌렀을 때 이동을 해야하니 <a>로 만들어야하고,
 * 반대로 하위링크가 없다면 상위링크는 눌렀을 때 아코디언이 펼쳐져야하니 = 키보드로 작동이 가능해야하니, 일단 button으로 감싸기로 결정했는데, 이거 구현이 미흡함.
 */
export interface SidebarProp extends Omit<ComponentProps<'div'>, 'ref'> {

}

export default function Sidebar({...rest}: SidebarProp) {

  return (
      <Wrap {...rest}/>
  );
}

const Wrap = styled.div`
`;
