import React, {useState} from 'react';
import InputText from '@components/extend/InputText';
import styled from 'styled-components';
import {ageApi} from '@store/reducers/age';

export default function AgePage() {
  
  /**
   * 1. The API is called 3 times. (not 5 times) ==> caching
   * 2. While entering "123456" from "123", the API will be not called. ==> caching
   * 3. As a result, only api logic remains.
   * (The code for dispatching actions for API calls, the code for updating the store after API is responded to, and the like do not need to be written.)
   */
  
  return (
    <Wrap>
      <Item initialValue=""/>
      <Item initialValue="1"/>
      <Item initialValue="1"/>
      <Item initialValue="1"/>
      <Item initialValue="123456"/>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

interface ItemProps {
  initialValue: string;
}

function Item({initialValue}: ItemProps) {
  const [name, setName] = useState(initialValue);
  const {data} = ageApi.useGetAgeQuery(name);
  
  return (
    <div>
      <Input value={name} onChangeText={setName} placeholder="Please enter your name"/>
      {data &&
      <Result>{data.age}</Result>
      }
    </div>
  );
}

const Result = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const Input = styled(InputText)`
  padding: 10px;
  border: 2px solid black;
  margin-right: 10px;
`;
