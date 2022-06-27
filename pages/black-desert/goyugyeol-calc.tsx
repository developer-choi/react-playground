import React, {useCallback, useEffect, useState} from 'react';
import InputComputableNumber from '@component/extend/InputComputableNumber';
import styled from 'styled-components';
import Form from '@component/extend/Form';
import RadioGroup from '@component/atom/RadioGroup';
import RadioLabel from '@component/atom/RadioLabel';
import {goYuGyeolManager} from '@util/extend/localStroage';
import {
  BLACK_STONE_ARMOR_BY_1HOUR,
  DROUGHTY_REVENUE_TABLES,
  GOYUGYEOL_COUNT_BY_1HOUR,
  goyugyeolRevenue
} from '@util/black-desert/goyugyeol';
import useIsFirstRender from '@util/custom-hooks/useIsFirstRender';
import {numberWithComma} from '@util/extend/number';

export default function GoyugyeolcalcPage() {
  
  const [goyugyeolPrice, setGoyugyeolPrice] = useState('');
  const [droughty, setDroughty] = useState(0);
  const [gipaPrice, setGipaPrice] = useState('');
  const [blackStoneArmorPrice, setBlackStoneArmorPrice] = useState('');
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
      setBlackStoneArmorPrice(String(item.blackStoneArmorPrice));
    }
  }, []);
  
  useEffect(() => {
    if (isFirstRender) {
      return;
    }
  
    goYuGyeolManager.setStringifyItem({
      droughty,
      goyugyeolPrice: Number(goyugyeolPrice),
      gipaPrice: Number(gipaPrice),
      blackStoneArmorPrice: Number(blackStoneArmorPrice)
    });
  }, [isFirstRender, goyugyeolPrice, droughty, gipaPrice, blackStoneArmorPrice]);
  
  const {gipaRevenue, blackStoneArmorRevenue, totalRevenue} = goyugyeolRevenue({
    goyugyeolPrice: Number(goyugyeolPrice),
    gipaPrice: Number(gipaPrice),
    droughty,
    blackStoneArmorPrice: Number(blackStoneArmorPrice)
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
        <StyledLabel>블방 가격</StyledLabel>
        <StyledInput value={blackStoneArmorPrice} onChangeText={setBlackStoneArmorPrice} enableComma enableDecimal={false}/>
      </StyledFieldSet>
      
      <StyledFieldSet>
        <StyledLabel>가문명성</StyledLabel>
        <RadioGroup name="droughty" value={String(droughty)} onChange={onChangeDroughty}>
          {DROUGHTY_REVENUE_TABLES.map(({value, meaning}) => (
            <CustomRadio key={value} label={meaning} value={String(value)}/>
          ))}
        </RadioGroup>
      </StyledFieldSet>
      
      <Info>1시간 기파수익 : <b>{numberWithComma(gipaRevenue)}</b></Info>
      <Info>1시간 블방수익 : <b>{numberWithComma(blackStoneArmorRevenue)}</b></Info>
      <Info>1시간 총수익 : <b>{numberWithComma(totalRevenue)}</b></Info>
      
      <Info># 밸류패키지 포함 가격입니다.</Info>
      <Info># 기파, 블랙스톤 방어구를 모두 팔았을 때 거래소 수수료 뗀 수익입니다.</Info>
      <Info># 고유결을 1시간동안 {GOYUGYEOL_COUNT_BY_1HOUR}개 깐다고 가정합니다.</Info>
      <Info># 고유결 {GOYUGYEOL_COUNT_BY_1HOUR}개 까서 기파가 {GOYUGYEOL_COUNT_BY_1HOUR}개 나왔다고 가정합니다.</Info>
      <Info># 1시간동안 나온 사냥꾼의 인장이 약 {BLACK_STONE_ARMOR_BY_1HOUR * 2}개, 이를 블방으로 바꿨을 때 {BLACK_STONE_ARMOR_BY_1HOUR}개라고 가정합니다.</Info>
      <Info># 블랙스톤 방어구는 모두 팔았을 때를 기준으로 가정합니다.</Info>
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
