import React from "react";
import Link from "next/link";
import styled from "styled-components";

/**
 * 미리 개발자 도구 열고 네트워크 패널에 fetch/xhr탭 고른다음 테스트하면됨.
 *
 * 기본 테스트케이스)
 * 1. getStaticProps() 적용한 페이지만 prefetch되고
 * 2. getServerSideProps() 적용한 페이지는 prefetch안됨.
 *
 * 상세 테스트케이스)
 * 1. 캐시삭제 강력새로고침 (Ctrl Shift R)
 * 2. 페이지입장 http://localhost:3000/study/next/prefetch/basic/start
 * 3. 네트워크패널에 /some1 /some2 2개 prefetch결과 200응답된것 확인
 * 4. 마우스 호버 해보면 /some /some2 둘 다 304가 응답되는것 확인
 * 5. 이후 F5 새로고침했을 때 또다시 304 응답되는것 확인 (= 동일한 브라우저로 모든창닫고 다시 들어와도 여전히 304 응답됨)
 * 6. 새로 다시 yarn build:dev 명령어로 빌드한 후 다시 실행했을 때는 또다시 200이 응답되는것 확인
 *
 * SSR 동작방법)
 * 1. ssg처럼, fetch/XHR항목에 json파일이 나타나며, getSSR()이 반환되야 이 json파일이 생성됨.
 * 2. 그래서 getSSR()이 5초걸리면 이 json파일도 TTFB 5초걸림.
 */
export default function Page() {
  return (
    <Wrap>
      <Link href="/study/next/prefetch/basic/some1">
        <a>prefetch 성공용도의 링크 (HOVER ME)</a>
      </Link>

      <Link href="/study/next/prefetch/basic/some2">
        <a>prefetch 성공용도의 링크 (HOVER ME)</a>
      </Link>

      <Link href="/study/next/prefetch/basic/some3">
        <a>prefetch 실패용도의 링크 (HOVER ME)</a>
      </Link>

      <Link href="/study/next/prefetch/basic/server-side">
        <a>SSR페이지는 prefetch 안되는것 확인하는 링크 (HOVER ME)</a>
      </Link>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
