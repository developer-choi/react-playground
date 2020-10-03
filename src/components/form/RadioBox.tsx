import React, {ComponentProps, forwardRef, ReactText, Ref} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

/**
 * 다른 라이브러리 인터페이스 조사
 * BasicRadioBox, BasicCheckBox 구현. (BasicCheckBox는 currentValue가 필요없지않을까?) 아 맞네 둘이 인터페이스도 다르겠네.
 */

type ExtendRadioButtonProp = Required<Pick<ComponentProps<'input'>, 'onChange' | 'value' | 'name'>> & ComponentProps<'input'>;

export interface RadioBox extends ExtendRadioButtonProp {
  label?: string;
  currentValue: ReactText;
}

export default forwardRef(function RadioBox({className, label, currentValue, value, ...rest}: RadioBox, ref: Ref<HTMLInputElement>) {

  /**
   * input + label을 id + htmlFor로 연결하면 생기는 문제는, wrap에서 버튼부분, 라벨부분을 제외한 나머지부분을 체크할 때 이벤트가 발생되지 않음.
   * 그래서 라벨을 감싸는 방식으로 만드는게 역시 좀 더 낫겠음.
   */

  return (
      <Wrap className={classNames({active: value === currentValue})}>
        <input ref={ref} type="radio" value={value} {...rest}/>
        <LabelText>{label}</LabelText>
      </Wrap>
  );
})

/**
 * 체크박스, 라디오박스를 바로 커스텀하는건 불가능함.
 * 그래서 css trick이 여러개 존재했었고, 대표적인것이 after before + position absolute였음.
 * styled 컴포넌트로 확장이 가능해야하기때문에, classname은 input이 아닌 wrap에 전달하는것이 합리적
 *
 */
const Wrap = styled.label`
  
  position: relative;
  overflow: hidden;
  height: 22px;
  display: flex;
  align-items: center;
  
  &.active:after {
    background-color: green;
  }
  
  > input {
    position: absolute;
    width: 1px;
    height: 1px;
    left: -1px;
  }
  
  &:after {
    position: absolute;
    width: 18px;
    height: 18px;
    left: 0;
    top: 1px;
    border: 1px solid lightgray;
    content: '';
    border-radius: 50%;
    background-color: white;
  }
`;

const LabelText = styled.span`
  padding-left: 23px;
`;

/**
 * 라디오버튼은 그룹중 반드시 하나만 선택. (아무것도 선택안되는경우도없고 2개이상 선택되는 경우도 없음)
 * 만약 라디오버튼이 하나만있다면 아무리 그 버튼 클릭해도 안바뀌는건 매우 당연한 현상임.
 * 다른 라디오버튼을 눌렀다면 기존 같은 그룹의 라디오버튼의 선택여부는 취소되어야함. (이거때문에 checked여부를 부모컴포넌트에 전달하는게 어려움)
 *  ==> 부모선택자는 존재하지않고, 특별한 이유가 있었다고함. (stackoverflow)
 *  ==> 물론 javascript로 해결이 가능하지만 추가적인 코드가 어느정도 필요하기 때문에, currentValue prop을 받는것으로 임시 해결을 봤음.
 */
