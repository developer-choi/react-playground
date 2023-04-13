import styled from 'styled-components';
import {flexCenter} from '@util/services/style/css';
import {range} from '@util/extend/data-type/number';
import Link from 'next/link';
import type {GetServerSideProps} from 'next';

/** Flow (Only Production)
 * 1. (O) URL 직접치고 들어가면 맨위로 스크롤
 * 2. (△) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨. (약간의 높이 오차있음)
 * 3. (O) 스크롤 안내리고 링크 타고 들어갔다가 뒤로가기하면 스크롤 맨위로감
 * 4. (X) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/default/ssr
export default function Page() {
  return (
    <Wrap>
      {list.map(value => (
        <Link key={value} href="/" passHref>
          <Row>{value}</Row>
        </Link>
      ))}
    </Wrap>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
    }
  };
};


const Wrap = styled.div`
  padding: 20px;
`;

const list = range(1, 100);

const Row = styled.a`
  height: 200px;
  border: 5px solid red;
  ${flexCenter};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
