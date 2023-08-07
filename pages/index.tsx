import React from 'react';
import {getAccountPresetListApi} from '@api/account-api';
import {useQuery} from '@tanstack/react-query';
import {numberWithComma} from '@util/extend/data-type/number';
import styled from 'styled-components';

export default function Page() {
  const {data} = useQuery({
    queryKey: ['account-book-preset'],
    queryFn: getAccountPresetListApi,
    staleTime: Infinity,
    cacheTime: Infinity
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      {data.data.list.map(({total, list, largeCategoryName}, index) => (
        <Item key={index}>
          <LargeCategoryName>{largeCategoryName} <Price>{numberWithComma(total)}</Price></LargeCategoryName>
          <ul>
            {list.map(({memo, commaPrice}, index) => (
              <li key={index}>
                <Memo>{memo}</Memo>
                <Price>{commaPrice}</Price>
              </li>
            ))}
          </ul>
        </Item>
      ))}

      <Total>전체총합 = <Price>{numberWithComma(data.data.total)}</Price></Total>
    </div>
  )
}

const LargeCategoryName = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
`;
const Memo = styled.span`
  display: inline-block;
  width: 140px;
`;
const Price = styled.span`
  color: ${props => props.theme.main};
  font-weight: bold;
`;

const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Total = styled.span`
  font-size: 20px;
  font-weight: bold;
`;