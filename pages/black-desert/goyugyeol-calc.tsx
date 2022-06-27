import React, {useCallback, useEffect, useState} from 'react';
import InputComputableNumber from '@component/extend/InputComputableNumber';
import styled from 'styled-components';
import Form from '@component/extend/Form';
import RadioGroup from '@component/atom/RadioGroup';
import RadioLabel from '@component/atom/RadioLabel';
import {goYuGyeolManager} from '@util/extend/localStroage';
import {DROUGHTY_REVENUE_TABLES, GOYUGYEOL_COUNT_BY_1HOUR, goyugyeolRevenue} from '@util/black-desert/goyugyeol';
import useIsFirstRender from '@util/custom-hooks/useIsFirstRender';
import {numberWithComma} from '@util/extend/number';

export default function GoyugyeolcalcPage() {
  
  const [goyugyeolPrice, setGoyugyeolPrice] = useState('');
  const [droughty, setDroughty] = useState(0);
  const [gipaPrice, setGipaPrice] = useState('');
  const isFirstRender = useIsFirstRender();
  
  const onChangeDroughty = useCallback((value: string) => {
    setDroughty(Number(value));
  }, []);
  
  useEffect(() => {
    const item = goYuGyeolManager.parseItem();
  
    if (item) {
      setGoyugyeolPrice(String(item.goyugyeolPrice));
      setDroughty(item.droughty);
      setGipaPrice(String(item.gipaPrice));
    }
  }, []);
  
  useEffect(() => {
    if (isFirstRender) {
      return;
    }
  
    goYuGyeolManager.setStringifyItem({droughty, goyugyeolPrice: Number(goyugyeolPrice), gipaPrice: Number(gipaPrice)});
  }, [isFirstRender, goyugyeolPrice, droughty, gipaPrice]);
  
  const resultRevenue = goyugyeolRevenue({
    goyugyeolPrice: Number(goyugyeolPrice),
    gipaPrice: Number(gipaPrice),
    droughty
  });
  
  return (
    <StyledForm>
      <StyledFieldSet>
        <StyledLabel>기파 가격</StyledLabel>
        <StyledInput value={gipaPrice} onChangeText={setGipaPrice} enableComma enableDecimal={false}/>
      </StyledFieldSet>
      
      <StyledFieldSet>
        <StyledLabel>고유결 가격</StyledLabel>
        <StyledInput value={goyugyeolPrice} onChangeText={setGoyugyeolPrice} enableComma enableDecimal={false}/>
      </StyledFieldSet>
      
      <StyledFieldSet>
        <StyledLabel>가문명성</StyledLabel>
        <RadioGroup name="droughty" value={String(droughty)} onChange={onChangeDroughty}>
          {DROUGHTY_REVENUE_TABLES.map(({value, meaning}) => (
            <CustomRadio key={value} label={meaning} value={String(value)}/>
          ))}
        </RadioGroup>
      </StyledFieldSet>
      
      <Info>1시간 수익 : <b>{numberWithComma(resultRevenue)}</b></Info>
      
      <Info>#밸류패키지 포함 가격입니다.</Info>
      <Info>#고유결을 1시간동안 {GOYUGYEOL_COUNT_BY_1HOUR}개 깐다고 가정합니다.</Info>
    </StyledForm>
  );
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const StyledLabel = styled.span`
  width: 100px;
`;

const StyledFieldSet = styled.fieldset`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  :last-of-type {
    margin-bottom: 50px;
  }
`;

const StyledInput = styled(InputComputableNumber)`
  padding: 5px;
  border: 2px solid ${props => props.theme.main};
`;

const CustomRadio = styled(RadioLabel)`
  margin-right: 10px;
`;

const Info = styled.span`
  margin-bottom: 10px;
  
  > b {
    color: ${props => props.theme.main};
  }
`;
