import React from 'react';
import styled from 'styled-components';

export default function AnchorPage() {

  return (
      <Wrap>
        내가 봐왔던 일반적인 웹사이트는,
        body태그에서 color 속성을 사용해서 하위 모든 태그에 상속시키고,

        anchor태그에서 color를 바꾸는거였음. (링크 그 못생긴 색깔)
        덩달아 :visited 색상도 바꾸고.

        근데 body에서 a:visited 색상도 지정했더니
        하위에서 a의 color를 바꿔도 body에 a:visited가 먼저 적용되는거였음.
        anchor의 색상을 어떻게 스타일 우선순위 고려해서 바꾸는지 다른사이트 어케하는지 찾아봐야함.
      </Wrap>
  );
}

const Wrap = styled.div`
`;
