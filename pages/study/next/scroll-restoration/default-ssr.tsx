import styled from "styled-components";
import {flexCenter} from "@util/services/style/css";
import {range} from "@util/extend/data-type/number";
import Link from "next/link";

/** Flow (Only Production)
 * 1. 스크롤 좀 내린다음
 * 2. 링크 아무거나 클릭하고
 * 3. 뒤로가기 했을 때
 *
 * 항상 스크롤복원이 안됨.
 */

export default function Page() {
  return (
    <Wrap>
      {list.map(value => (
        <Link key={value} href="/" scroll={false} passHref>
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
