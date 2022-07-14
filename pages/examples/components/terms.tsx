import React, {useCallback} from 'react';
import CheckBox from '@component/atom/CheckBox';
import type {GetStaticProps} from 'next';
import {Button} from '@component/atom/button/button-presets';
import Form from '@component/extend/Form';
import styled from 'styled-components';
import {useTerms} from '@util/custom-hooks/useTerms';

interface Term {
  pk: number;
  title: string;
  content: string;
  required: boolean;
}

interface PageProp {
  terms: Term[];
}

export default function Page({terms}: PageProp) {
  
  const {allRequiredChecked, allChecked, toggleAllAgree, toggleAgree, isAgree} = useTerms(terms);
  
  const onConfirm = useCallback(() => {
    if (!allRequiredChecked) {
      alert('필수 이용약관을 모두 동의해주세요.');
      return;
    }
  
    alert('이용약관 체크 통과');
  }, [allRequiredChecked]);
  
  return (
    <StyledForm>
      <CheckBox onChangeChecked={toggleAllAgree} checked={allChecked} label="전체동의"/>
      {terms.map(({pk, title}) => (
        <CheckBox key={pk} onChangeChecked={() => toggleAgree(pk)} checked={isAgree(pk)} label={title}/>
      ))}
      <Button onClick={onConfirm}>확인</Button>
    </StyledForm>
  );
};

export const getStaticProps: GetStaticProps<PageProp> = async () => {
  return {
    props: {
      terms: [
        {pk: 1, title: '필수약관1', content: '필수약관1의 내용', required: true},
        {pk: 2, title: '필수약관2', content: '필수약관2의 내용', required: true},
        {pk: 3, title: '선택약관1', content: '선택약관1의 내용', required: false},
        {pk: 4, title: '선택약관2', content: '선택약관2의 내용', required: false}
      ]
    }
  };
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 200px;
  
  > * {
    margin-bottom: 5px;
  }
`;
