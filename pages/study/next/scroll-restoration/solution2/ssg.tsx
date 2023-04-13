import styled from "styled-components";
import {flexCenter} from "@util/services/style/css";
import {range} from "@util/extend/data-type/number";
import Link from "next/link";
import {useScrollRestorationSolution2} from '@util/extend/next';

/** Flow (Only Production)
 * 1. 새로고침했을 때 Layout Shift때문에 너무 보기흉함.
 * 2. 링크타고 들어갔다가 뒤로가기했을때도 Layout Shift때문에 너무 보기흉함.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/solution2/ssg
export default function Page() {
  useScrollRestorationSolution2();
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
