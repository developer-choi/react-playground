import React from 'react';

export default function TextRequirement() {

  return (
      <div>
        <h1>텍스트</h1>

        <h2>공통</h2>
        <ul>
          <li>똑같은 요구조건을 구현할 다른방법이 있는지 모름. 이걸 구현하는 여러가지 방법들 중 제일 좋은 방법을 찾아야함.</li>
        </ul>

        <h2>요구조건</h2>
        <ul>
          <li>모든 페이지의 거의 모든 글꼴은 통일되야한다는 이야기. (구현은 상속관련 얘기 넣고 body 태그에서 보통 넣는다는 이야기. -- 왜 바디태그에 넣게되었지?)</li>
        </ul>

        <h2>개선 - 편하게 스타일링할 수 있도록 래핑 (조건 : 반응형, 크로스 브라우징)</h2>
        <ul>
          <li>글자 자릿수를 편하게 제한할 수 있는 numberOfLines prop (현재 구현된건 크롬에서만 잘됨)</li>
        </ul>
      </div>
  );
}
