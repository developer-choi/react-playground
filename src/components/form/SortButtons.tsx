import React, {DivProp} from 'react';
import styled from 'styled-components';

//원래는 다른 타입파일에 있어야.
export type Direction = 'asc' | 'desc'

export interface SortButtonsProp<OrderbyType extends string = string> extends DivProp {
  /**
   * 이게 추후 active 조건을 이 컴포넌트에서 스스로 판단하여 active효과를 낼 수 있음.
   *
   * 한계는, https://dorenims.com/global/energy 였음.
   * 저런경우 데이터타입 잡을 때 에너지이름으로 잡게 될것.
   * water, solar의 property name 안에 그날 generationTime같은걸 저장하게 될것임.
   * 그렇다고 orderby를 solar-generationTime, water-generationTime으로 한다?
   * 그러면 "solar-generationTime"이라는 값으로 solar, generationTime을 분해해서 이걸로 정렬을 시키는 실제 로직을 돌릴 때 문제가 됨.
   * 그래서 나는 저 경우에 energy라는 prop을 하나 더 받고, 이걸로 이 컴포넌트 스스로 active 판단할 때도 체크했음.
   * 그대신 orderby에 generationTime, energy에 solar로 저장해서, "solar", "generationTime" 이 2개로 정렬 로직도 돌렸고.
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

export default function SortButtons<OrderbyType extends string = string>({orderby, onAsc, onDesc, currentSort, ...rest}: SortButtonsProp<OrderbyType>) {

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
