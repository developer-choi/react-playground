import React, {useCallback, useMemo, useState} from 'react';
import TextArea from '@component/extend/TextArea';
import styled from 'styled-components';
import {Button} from '@component/atom/button/button-presets';

export default function Page() {
  
  const [value, setValue] = useState('');
  const coupons = useMemo(() => parser(value), [value]);
  
  const sendCoupon = useCallback(() => {
    navigator.clipboard.writeText(`
    
let couponLength = 0;
let respondCount = 0;

function reqListener (event) {
  console.log(event.target.responseText);
  respondCount++;
  
  if(respondCount === couponLength) {
    location.href = 'https://www.kr.playblackdesert.com/MyPage/WebItemStorage';
  }
}

function sendCoupon(coupons) {
  couponLength = coupons.length;

  coupons.forEach(coupon => {
    const [first, second, third, fourth] = coupon.split('-');
    let formData = new FormData();
    formData.set('_couponCode1', first);
    formData.set('_couponCode2', second);
    formData.set('_couponCode3', third);
    formData.set('_couponCode4', fourth);
  
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("POST", "https://payment.kr.playblackdesert.com/Shop/Coupon/SetCouponProcess");
    oReq.send(formData);
  });
}

function main() {
  let coupons = [${coupons.map(coupon => `'${coupon}'`).join(',')}];
  sendCoupon(coupons);
}

main();

`);
  }, [coupons]);
  
  return (
    <Wrap>
      <StyledTextArea placeholder="검은사막 쿠폰번호를 복사붙여넣기 해주세요." value={value} onChangeText={setValue}/>
      {coupons.length > 0 &&
      <ul>
        {coupons.map(coupon => (
          <li key={coupon}>{coupon}</li>
        ))}
        <li>
          <Button onClick={sendCoupon}>쿠폰번호 전송코드 복사하기</Button>
        </li>
      </ul>
      }
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
`;

const StyledTextArea = styled(TextArea)`
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;

function parser(text: string) {
  if (text.length === 0) {
    return [];
  }
  
  const result = text.split('\n').filter(value => {
    return value.length === 19;
  });
  
  if (result.length === 0) {
    alert('쿠폰번호 파싱결과 쿠폰이 존재하지않음.');
  }
  
  return result;
}
