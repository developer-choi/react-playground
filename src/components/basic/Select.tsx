import React, {ReactChild, ReactText} from 'react';
import styled from 'styled-components';

/**
 * 가장 기본적인 인터페이스.
 *
 * 하지만 문제가있다.
 *
 * (1) 선택된 Select박스 안에 보이는 내용(value prop)과
 * 목록의 내용(label)이 전부 string일 경우에 밖에 대응이 되지않는다.
 *
 * 막 확장한답시고 select items 목록에 아이콘 넣을 수 없지
 * 선택된 select값 보여주는 select box안에 아이콘같은거 못넣지
 *
 * 즉, 만약 value가 number라면 일일히 타입 캐스팅을 해야하는데
 * 매번 타입 캐스팅을 하면 ts를 쓰는 의미가 사라진다.
 *
 * ==> value의 타입을 Generic으로 선언하여 타입 체크를 동적으로  하게했다.
 *
 * (2) 기존은 onChangeHandler에 value값밖에 못받았다.
 * 선택된 아이템 통째로 받는경우가 더 편한 경우가 옜날에 있었다. (그 경우가 기억이 안남)
 *
 * 그러므로, HTML 기본 제공 Select를 Extend한 SelectExtend.tsx를 별도로 만들고,
 * 모든 경우에 대해 대응이 가능한 Select.tsx를 제작중에있다.
 */

/**
 * label의 타입을 generic으로 할필요없이 그냥 항상 ReactChild로 고정하는게 더 낫지않을까? 굳이 이렇게 할 이유가있을까.
 */
export interface BasicItem<V> {
  label: ReactChild,
  value: V
}

export interface SelectProp<V extends ReactText, I extends BasicItem<V>> {
  items: I[];
  value: ReactChild;
  onChange: (value: V, item: I) => void;
}

export default function Select<V extends ReactText, I extends BasicItem<V>>({onChange, items, value, ...rest}: SelectProp<V, I>) {

  /**
   * SelectBox, OptionList 2개는 Arrow Up Down으로 조작이 가능해야함.
   */

  return (
      <Wrap {...rest}>

      </Wrap>
  );
};

const Wrap = styled.div`
`;
