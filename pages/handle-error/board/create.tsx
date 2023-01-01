import React, {useCallback, useRef, useState} from 'react';
import {getSSPForLoggedIn} from '@util/services/auth/auth';
import styled from 'styled-components';
import Form from '@component/extend/Form';
import InputText from '@component/extend/InputText';
import TextArea from '@component/extend/TextArea';
import BoardApi from '@api/BoardApi';
import {handleClientSideError} from '@util/services/handle-error/client-side-error';
import Button from '@component/atom/element/Button';
import {useRouter} from 'next/router';

export default function Page() {
  return (
    <BoardForm/>
  );
}

export const getServerSideProps = getSSPForLoggedIn;

function BoardForm() {
  const {push} = useRouter();
  const [title, setTitle] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = useCallback(async () => {
    const _title = title.trim();
    const _content = content.trim();

    if (_title.length === 0) {
      alert('제목을 입력해주세요');
      titleRef.current?.focus();
      return;
    }

    if (_content.length === 0) {
      alert('내용을 입력해주세요');
      contentRef.current?.focus();
      return;
    }

    const api = new BoardApi();

    try {
      await api.postCreate({title: _title, content: _content, boardType: 'FREE'});
      await push('/handle-error/board/list/1');
    } catch (error) {
      handleClientSideError(error);
    }

  }, [content, push, title]);

  const onReset = useCallback(() => {
    setTitle('');
    setContent('');
  }, []);

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledInput ref={titleRef} placeholder="제목을 입력해주세요." value={title} onChangeText={setTitle}/>
      <StyledTextArea ref={contentRef} placeholder="내용을 입력해주세요." value={content} onChangeText={setContent} onCtrlEnter={onSubmit}/>
      <ButtonWrap>
        <Button className="gray" type="reset" onClick={onReset}>취소</Button>
        <Button type="submit">저장</Button>
      </ButtonWrap>
    </StyledForm>
  );
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const StyledInput = styled(InputText)`
  border: 1.5px solid ${props => props.theme.main};
  height: 30px;
  padding: 5px;
`;

const StyledTextArea = styled(TextArea)`
  height: 300px;
  border: 1.5px solid ${props => props.theme.main};
  padding: 5px;
  
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  
  > button:first-of-type {
    margin-right: 15px;
  }
`;
