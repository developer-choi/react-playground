import React from 'react';
import {range} from '@util/extend/data-type/number';
import Link from 'next/link';
import styled from 'styled-components';

// URL: http://localhost:3000/study/next/prefetch/multiple-with-image/start

/** 테스트방법
 * 1. yarn build:dev
 * 2. 저 페이지 드가서 개발자도구 열고 네트워크 > ALL 탭으로 보면
 * 3. image가 있다고 해서 page JSON파일을 다운받는데 영향을 주지는않는것으로 결론남.
 */
export default function Page() {
  return (
    <>
      <Wrap>
        {hrefs.map(target => (
          <Link key={target} href={target}>
            <a>{target}</a>
          </Link>
        ))}
      </Wrap>
      <div>
        {images.map(image => (
          <img key={image} src={image} alt="테스트용 이미지" width={10}/>
        ))}
      </div>
    </>
  );
}

const ranges = range(1, 100)
const hrefs = ranges.map(value => `/study/next/prefetch/multiple-with-image/${value}`);
const images = ranges.map(value => `http://localhost:8000/backgrounds/${value}.jpg`);

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
