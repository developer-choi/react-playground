import React, {ReactNode, useCallback, useState} from 'react';
import {BiDownArrow} from 'react-icons/all';
import styled from 'styled-components';
import {alignItemsCenter, flexDirectionColumn} from '../../utils/style/css';

/**
 * 하지만 이렇게하면 단점은, Value를 다양하게 가져갈 수 없음.
 * 저번에 Value를 item 통째로 받고싶은 경우가 있었음. 하지만 그런경우가 그때 뺴고는 한번도없었는데..
 * 정말로 item 통쨰로 받아야만 해결이 가능했던걸까? 그때 아마 검색 필터 선택박스였고 orderby랑 direction value 같이 받으려고 했던듯.
 * 흠 item통째로 받는거 정말 필요하긴하네.
 * item을 통째로 받을경우에 select items modal에서 현재 선택된거 active효과도 줄 수 있어야함.
 */
export interface Item<Value extends ReactNode> { //label없이 선택된 value를 그대로 보여줄 수도 있으니까, 일단 렌더링이 가능한 타입을 extends해야함.
  label?: ReactNode; //label없이 선택된 value를 그대로 보여주려고 할 수도 있으니까.
  value: Value;
}

export interface BasicSelectProp<Value> extends SelectItemsProp<Value> {
  value: Value | undefined;

  /**
   * 이렇게하면 기존에 value (박스안에서 선택된거 보여줄거 라는 의미가 안통해서 currentValue로 바꿨었는데,
   * 그냥 items에서 저 value로 찾아서 그 label 보여주자.
   * 단, value는 선택된게 없을 수도 있으니 undefined도 추가하고.
   */
}

export default function BasicSelect<Value>({items, value, onChangeValue, ...rest}: Pick<BasicSelectProp<Value>, 'value' | 'onChangeValue' | 'items'>) {

  const [visible, setVisible] = useState(false);
  const selectedItem = items.find(item => item.value === value);

  const toggleModal = useCallback(() => {
    setVisible(prevState => !prevState);
  }, []);

  const _onChangeValue = useCallback((value: Value) => {
    setVisible(false);
    onChangeValue(value);
  }, [onChangeValue]);

  if (value !== undefined && selectedItem === undefined) {
    console.warn('선택된 아이템의 value와 일치하는 item이 items에 없습니다.');
  }

  return (
      <Wrap {...rest}>
        <SelectedItem onClick={toggleModal}>
          {selectedItem?.label ?? selectedItem?.value}
          <Arrow className={visible ? 'visible' : ''} size={15} color="white"/>
        </SelectedItem>
        {undefined}
        <SelectItems currentValue={selectedItem?.value} visible={visible} items={items} onChangeValue={_onChangeValue}/>
      </Wrap>
  );
}

export interface SelectItemsProp<Value> {
  items: Item<Value>[];
  onChangeValue: (value: Value) => void;
  visible: boolean;
  currentValue: BasicSelectProp<Value>['value'];
}

function SelectItems<Value>({items, onChangeValue, visible, currentValue}: SelectItemsProp<Value>) {

  return (
      <ItemsWrap className={visible ? 'visible' : ''}>
        {items.map(({value, label}) => (
            <ItemStyle tabIndex={-1} key={`item-${value}`} className={value === currentValue ? 'active' : ''} onClick={() => onChangeValue(value)}>{label ?? value}</ItemStyle>
        ))}
      </ItemsWrap>
  );
}

const Wrap = styled.div`
  position: relative;
  display: inline-flex;
`;

const SelectedItem = styled.button`
  min-width: 200px;
  position: relative;
  ${alignItemsCenter};
`;

const ItemsWrap = styled.div`
  ${flexDirectionColumn};
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  display: none;
  z-index: 123;
  
  &.visible {
    display: flex;
  }
`;

const ItemStyle = styled.div`
  transition: 0.2s;
  cursor: pointer;
  
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
  
  &:hover, &.active {
    background-color: red;
  }
`;

const Arrow = styled(BiDownArrow)`
  position: absolute;
  right: 10px;
  transition: 0.3s;
  
  &.visible {
    transform: rotate(180deg);
  }
`;
