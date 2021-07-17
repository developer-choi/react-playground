import React, {useState} from 'react';
import Head from 'next/head';
import InputText from '@components/extend/InputText';
import styled from 'styled-components';
import TextAreaExtend from '@components/extend/TextArea';

export default function FormMaxLengthPage() {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  
  return (
      <>
        <Head>
          <title>form-max-length</title>
        </Head>
        <Wrap>
          <StyledInputText value={text} onChangeText={setText} maxLength={10}/>
          <StyledTextArea value={text2} onChangeText={setText2} maxLength={100}/>
        </Wrap>
      </>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledInputText = styled(InputText)`
  border: 2px solid black;
  padding: 5px;
`;

const StyledTextArea = styled(TextAreaExtend)`
  border: 2px solid black;
  padding: 5px;
`;
