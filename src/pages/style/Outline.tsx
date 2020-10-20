import React from 'react';
import styled from 'styled-components';

export default function Outline() {

  return (
      <Wrap>
        아웃라인을 안쪽으로 적용하는방법은 크게 2가지를 찾았따.
        outline-offset을 조정하는 방법이 있고, (예시 : 내가만들었던 사이드바 아이템들)
        아예 focusable element 바깥에 wrapper를 씌우고 그 wrapper에 padding을 적용하는 방법이 있다. (예시 : react-library에 있는 StyledInput)

        어느게 더 좋은지는 좀더 생각해봐야함.
       </Wrap>
  );
}

const Wrap = styled.div`
`;
