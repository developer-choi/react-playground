import React from 'react';
import styled from 'styled-components';
import {useSetDocumentTitle} from '../../../utils/custom-hooks/useSetDocumentTitle';
import moment from 'moment';

export default function DateApiPage() {

  useSetDocumentTitle('Date');

  return (
      <Wrap>
        date.ts로 응용해서 만들 수 있는 컴포넌트들과,
        moment library usage를 여기 페이지에 담자.

        date.ts는 주로 sundy에서 {'< >'} 누르면 막 날짜가 day로 바뀌고

        달력에서는 이전월 이후월 버튼누르면 막 그거랑
        달력 그 자체 (8월, 7월 마지막주 ~ 8월첫주 부분) 보여주는거 컴포넌트랑.
        이런거 다 여기페이지에 쭉 보여주면 되겠다.

        최대한 CodeHighlighter는 안쓰고, 이 웹사이트를 구성해보자구.
        컴포넌트만 웹페이지에 보여주고 요거 구현해봐 조건은 이거야 하자구.
      </Wrap>
  );
}

const Wrap = styled.div`
`;

const dateToNumber = new Date().getTime();

/**
 * usage는 딱 format하나임.
 * 나머지는 Date API만 사용하면되고, 그게 utils/date.ts에 있음.
 */
const FORMAT = 'YYYY년 MM월 DD일';
console.log(moment(dateToNumber).format(FORMAT));
console.log(moment().valueOf(), dateToNumber);
