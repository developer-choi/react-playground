import React, {useState} from 'react';
import styled from 'styled-components';
import TextArea from '@component/extend/TextArea';
import {postAccountParseApi} from '@api/account-api';
import {useQuery} from '@tanstack/react-query';
import {numberWithComma} from '@util/extend/data-type/number';

export default function Page() {
  const [value, setValue] = useState('');
  const {data} = useQuery({
    queryKey: ['parsed-account-book', value],
    queryFn: () => postAccountParseApi(value),
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!value
  });

  return (
    <div>
      <StyledTextArea value={value} onChangeText={setValue}/>
      {!data ? null : (
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
      )}
    </div>
  )
}

const StyledTextArea = styled(TextArea)`
  width: 500px;
  height: 500px;
`;

const LargeCategoryName = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
`;
const Memo = styled.span`
  display: inline-block;
  width: 200px;
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
