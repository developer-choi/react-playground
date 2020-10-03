import React, {ReactChild, ReactText} from 'react';
import styled from 'styled-components';

export type BasicItem<L, V> = {
  label: L,
  value: V
};

export interface SelectProp<L extends ReactChild, V extends ReactText, I extends BasicItem<L, V>> {
  items: I[];
  value: ReactChild;
  onChange: (value: V, item: I) => void;
}

export default function Select<L extends ReactChild, V extends ReactText, I extends BasicItem<L, V>>({onChange, items, value, ...rest}: SelectProp<L, V, I>) {

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
