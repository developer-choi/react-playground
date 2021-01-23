import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {FlexDirectionColumn} from '../../utils/style/css';
import {BasicButton} from '../../components/styled/buttons';

interface Item {
  name: string;
  onClickHandler: () => void;
}

export default function Home() {
  
  const items = useRef<Item[]>(names.map((name) => ({
    name,
    onClickHandler: () => console.log(name)
  }))).current;
  
  const [bool, setBool] = useState(false);
  
  const forceRender = useCallback(() => {
    setBool(prevState => !prevState);
  }, []);
  
  return (
      <HomeStyle>
        {items.map(({name, onClickHandler}, index) => (
            <ItemComponent key={index} name={name} onClickHandler={onClickHandler}/>
        ))}
        <ForceRerender onClick={forceRender}>Force Render</ForceRerender>
      </HomeStyle>
  );
}

const names = ['a', 'b', 'c'];

function ItemComponent({onClickHandler, name}: Item) {
  
  useEffect(() => {
    console.log('child useEffect call', onClickHandler, name);
  }, [name, onClickHandler]);
  
  return (
      <ItemWrap onClick={onClickHandler}>
        <Name>{name}</Name>
      </ItemWrap>
  );
}

const ItemWrap = styled(BasicButton)`
  width: 100px;
  padding: 10px 0;
  border: 2px solid red;
  font-size: 17px;
  margin-bottom: 10px;
`;

const Name = styled.span`
`;

const HomeStyle = styled.div`
  padding: 30px;
  ${FlexDirectionColumn};
`;

const ForceRerender = styled(BasicButton)`
  background-color: red;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
`;
