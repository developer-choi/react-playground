import React from "react";
import {range} from "@util/extend/data-type/number";
import styled from "styled-components";
import Link from "next/link";
import {getHandleRQErrorExample} from "@pages/study/rq/handle-error/solution/[pk]";

// URL: http://localhost:3000/study/rq/handle-error/list
export default function Page() {
  return (
    <Wrap>
      <Item>
        {array.map((pk) => (
          <Link key={pk} href={`/study/rq/handle-error/solution/${pk}`}>
            <a>
              {getHandleRQErrorExample(pk).type}-{pk}
            </a>
          </Link>
        ))}
      </Item>
    </Wrap>
  );
}

const array = range(1, 3);

const Wrap = styled.div`
  padding: 10px;

  a {
    padding: 5px;
    font-size: 16px;
    text-decoration: underline;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;
