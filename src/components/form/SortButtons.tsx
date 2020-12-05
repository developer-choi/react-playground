import React, {DivProp} from 'react';
import styled from 'styled-components';

//원래는 다른 타입파일에 있어야.
export type Direction = 'asc' | 'desc'

export interface SortButtonsProp<OrderbyType extends string = string> extends DivProp {
  /**
   * 이게 추후 active 조건을 이 컴포넌트에서 스스로 판단하여 active효과를 낼 수 있음.
   */
  orderby: OrderbyType;
  /**
   * 이건 필요없음. direction은 어디를 가더라도 asc desc라고 타입으로 약속을 정할거기 때문에.
   * 단 orderby는 페이지마다 정렬기준이 다 다를 수 있으므로 필요한것임.
   */
  // direction: Direction;

  /**
   * 그리고 받았던 orderby, direction을 클릭 콜백으로 넘겨준다.
   */
  onAsc: (orderby: OrderbyType, direction: Direction) => void;
  onDesc: (orderby: OrderbyType, direction: Direction) => void;

  /**
   * 현재 정렬값이 뭔지를 알아야 orderby, direction랑 비교해서 active조건을 판단가능.
   * 단, 현재 정렬설정한게 아무것도 없을 수 있으니 optional 추가.
   */
  currentSort?: {
    orderby: OrderbyType;
    direction: Direction;
  }
}

export default function SortButtons({orderby, onAsc, onDesc, currentSort, ...rest}: SortButtonsProp) {

  const isAscActive = currentSort === undefined ? false : currentSort.direction === 'asc' && currentSort.orderby === orderby;
  const isDescActive = currentSort === undefined ? false : currentSort.direction === 'desc' && currentSort.orderby === orderby;

  return (
      <Wrap {...rest}>
        <button className={isAscActive ? 'active' : ''} onClick={() => onAsc(orderby, 'asc')}>up button</button>
        <button className={isDescActive ? 'active' : ''} onClick={() => onDesc(orderby, 'desc')}>down button</button>
      </Wrap>
  );
}

const Wrap = styled.div`
`;
