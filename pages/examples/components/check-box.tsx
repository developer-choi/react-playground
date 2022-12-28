import React, {useCallback, useState} from 'react';
import CheckBox, {CheckBoxLabelLeftProps, CheckBoxProps} from '@component/atom/forms/CheckBox';
import NaverCheckBoxSvg from '@component/atom/forms/NaverCheckBoxSvg';
import styled from 'styled-components';

export default function CheckboxPage() {
  const [someValue, setSomeValue] = useState(false);

  return (
    <Wrap>
      <CheckBox checked={someValue} onChangeChecked={setSomeValue} label="default checkbox"/>
      <NaverCheckBox checked={someValue} onChangeChecked={setSomeValue} label="naver checkbox"/>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function NaverCheckBox(props: Omit<CheckBoxProps, 'labelLeft'>) {
  const labelLeftRender = useCallback(({checked}: CheckBoxLabelLeftProps) => {
    return <NaverCheckBoxSvg color={checked ? '#03C75A' : '#707070'}/>
  }, []);

  return (
      <NaverStyledCheckBox labelLeft={labelLeftRender} {...props}/>
  );
}

const NaverStyledCheckBox = styled(CheckBox)`
  font-size: 18px;
  
  input {
    appearance: none;
    margin-right: 5px;
  }
`;
