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
        <StyledLabel>?????? ??????</StyledLabel>
        <StyledInput value={gipaPrice} onChangeText={setGipaPrice} enableComma enableDecimal={false}/>
      </StyledFieldSet>
      
      <StyledFieldSet>
        <StyledLabel>????????? ??????</StyledLabel>
        <StyledInput value={goyugyeolPrice} onChangeText={setGoyugyeolPrice} enableComma enableDecimal={false}/>
      </StyledFieldSet>
      
      <StyledFieldSet>
        <StyledLabel>?????? ??????</StyledLabel>
        <StyledInput value={blackStoneArmorPrice} onChangeText={setBlackStoneArmorPrice} enableComma enableDecimal={false}/>
      </StyledFieldSet>
      
      <StyledFieldSet>
        <StyledLabel>????????????</StyledLabel>
        <RadioGroup name="droughty" value={String(droughty)} onChange={onChangeDroughty}>
          {DROUGHTY_REVENUE_TABLES.map(({value, meaning}) => (
            <CustomRadio key={value} label={meaning} value={String(value)}/>
          ))}
        </RadioGroup>
      </StyledFieldSet>
      
      <Info>1?????? ???????????? : <b>{numberWithComma(gipaRevenue)}</b></Info>
      <Info>1?????? ???????????? : <b>{numberWithComma(blackStoneArmorRevenue)}</b></Info>
      <Info>1?????? ????????? : <b>{numberWithComma(totalRevenue)}</b></Info>
      
      <Info># ??????????????? ?????? ???????????????.</Info>
      <Info># ??????, ???????????? ???????????? ?????? ????????? ??? ????????? ????????? ??? ???????????????.</Info>
      <Info># ???????????? 1???????????? {GOYUGYEOL_COUNT_BY_1HOUR}??? ????????? ???????????????.</Info>
      <Info># ????????? {GOYUGYEOL_COUNT_BY_1HOUR}??? ?????? ????????? {GOYUGYEOL_COUNT_BY_1HOUR}??? ???????????? ???????????????.</Info>
      <Info># 1???????????? ?????? ???????????? ????????? ??? {BLACK_STONE_ARMOR_BY_1HOUR * 2}???, ?????? ???????????? ????????? ??? {BLACK_STONE_ARMOR_BY_1HOUR}????????? ???????????????.</Info>
      <Info># ???????????? ???????????? ?????? ????????? ?????? ???????????? ???????????????.</Info>
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
