import React, {useCallback, useState} from 'react';
import Head from 'next/head';
import CheckBox, {CheckBoxLabelLeftProps, CheckBoxProps} from '@component/atom/CheckBox';
import NaverCheckBoxSvg from '@component/svgs/NaverCheckBoxSvg';
import styled from 'styled-components';

export default function CheckboxPage() {
  
  const [someValue, setSomeValue] = useState(false);
  
  return (
      <>
        <Head>
          <title>check-box</title>
        </Head>
        <Wrap>
          <CheckBox checked={someValue} onChangeChecked={setSomeValue} label="default checkbox"/>
          <NaverCheckBox checked={someValue} onChangeChecked={setSomeValue} label="naver checkbox"/>
        </Wrap>
      </>
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
