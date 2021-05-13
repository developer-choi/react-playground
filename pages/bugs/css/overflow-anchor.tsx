import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import styled from 'styled-components';

export default function OverflowAnchorPage() {
  
  const [list, setList] = useState<Item[]>([]);
  
  useEffect(() => {
    
    const fetchData = async () => {
      const res = await apiGetList();
      setList(res.slice(0, 9));
    };
    
    setTimeout(() => {
      fetchData().then();
    }, 500);
    
  }, [list]);
  
  useEffect(() => {
    document.body.style.height = '150vh';
    document.body.style.backgroundColor = 'darkblue';
  }, []);
  
  return (
      <>
        <Head>
          <title>overflow-anchor</title>
        </Head>
        <Container>
          {list.map(({uniqueKey, value}) => (
              <Item key={`item-${uniqueKey}`} className="item">
                {value}
              </Item>
          ))}
        </Container>
      </>
  );
}

let list: Item[] = [];

export function apiGetList() {
  const newItem: Item = {
    uniqueKey: list.length + 1,
    value: list.length + 1
  };
  list = [newItem, ...list];
  return [...list];
}

export interface Item {
  uniqueKey: number;
  value: number;
}

const Container = styled.div`
  background: yellow;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  //overflow-anchor: none; 이 주석을 해제 / 활성화해보면서 테스트.
  overflow: hidden;
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Item = styled.div`
  margin-bottom: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: wheat;
  font-weight: bold;
  background: red;
`;
