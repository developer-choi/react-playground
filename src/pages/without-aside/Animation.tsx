import React from 'react';
import styled from 'styled-components';

export default function Animation() {

  return (
      <AnimationStyle>

        <ul>
          <li>transform으로 가능한 애니메이션은 대체로 left, right, top같은걸로도 만들 수 있지만,
            어느게 더 장점이 있고 어떤 차이점이 있는지 까지는 모르겠다.</li>

          <li>transition vs animation은, transition의 경우 시작과 끝이 있는 애니메이션에 적합하다고 판단되고,</li>
          <li>animation은 애니메이션이 되는 중간 지점마다 효과를 더 넣을 수 있다는게 장점이라고 판단된다.</li>
          <li>
            또한, 아직 <a href="https://youtu.be/zHUpx90NerM?t=2126">유튜브 영상</a>을 완전히 이해못했는데,
            Animation은 Trigger를 css로만 가능한게 확인이 되었다. 마치 Animated.sequence에 사이사이 delay까지 다 넣을 수 있는 그런 느낌.
          </li>
          <li>물론 아직 모든걸 알아본건 아니기때문에 각 항목별로 키워드를 다시 한번 더 검색해보면서 이 사실이 진짜인지 확인하는게 필요하다.</li>
        </ul>

      </AnimationStyle>
  );
}

const AnimationStyle = styled.div`
`;
