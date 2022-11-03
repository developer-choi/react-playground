import React, {useCallback, useState} from 'react';
import {timeoutPromise} from '@util/extend/promise';
import Form from '@component/extend/Form';
import styled from 'styled-components';
import InputText from '@component/extend/InputText';
import {Button} from '@component/atom/button/button-presets';
import {useMutation} from '@tanstack/react-query';

export default function Page() {
  const [title, setTitle] = useState('');
  // const [errorMessage, setErrorMessage] = useState(''); mutation.reset() 안쓰면 원래 이거 일일히 다 했어야했음.

  const {mutate, isError, reset, error} = useMutation(updateTodo, {
    onSuccess: (data, variables, context) => {
      console.log('success', data, variables, context);
    },
    onError: (error, variables, context) => {
      console.log('error', error, variables, context);
      // setErrorMessage(error.message); mutation.reset() 안쓰면 원래 이거 일일히 다 했어야했음.
    }
  });

  const onChangeTitle = useCallback((title: string) => {
    setTitle(title);
    console.log('isError', isError);

    if (isError) {
      reset();
      //setErrorMessage(''); mutation.reset() 안쓰면 원래 이거 일일히 다 했어야했음.
    }
  }, [isError, reset]);

  const onSubmit = () => {
    mutate({pk: 1, title});
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <InputText value={title} onChangeText={onChangeTitle} placeholder="대충 수정하기전 제목"/>
      {!error ? null : <ErrorMessage>{(error as Error).message}</ErrorMessage>}
      <Button type="submit">수정</Button>
    </StyledForm>
  );
}

async function updateTodo({title}: {pk: number, title: string}) {
  await timeoutPromise(500);

  if (title.length === 0) {
    throw new Error('제목길이 0임');
  }

  return {
    status: 'success'
  };
}

const StyledForm = styled(Form)`
  > * {
    display: block;
    border: 1px solid black;
    padding: 5px;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-weight: bold;
`;
