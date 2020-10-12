import React, {ComponentProps} from 'react';
import styled from 'styled-components';
import DropDownItem, {DropDownItemType} from './DropDownItem';

export interface DropDownProp extends Omit<ComponentProps<'div'>, 'ref'> {
  items: DropDownItemType[];
}

export default function DropDown({items, ...rest}: DropDownProp) {

  return (
      <Wrap {...rest}>
        {items.map((item, index) => (
            <DropDownItem key={`dropdown-${index}`} item={item}/>
        ))}
      </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 100%;
`;
