import React, {useCallback, useState} from 'react';
import TextArea from '@component/extend/TextArea';
import Button from '@component/atom/element/Button';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import {getMethodSomeApi, postMethodSomeApi} from '@api/method-api';

export default function Page({value}: {value: any}) {
  const {reload} = useRouter();

  const [textareaValue, setTextareaValue] = useState(`<script>
alert("Textarea XSS Attacked");
</script>`);

  const postScript = useCallback(async (value: string) => {
    await postMethodSomeApi({value});
    reload();
  }, [reload]);

  return (
    <Wrap>
      <StyledTextArea value={textareaValue} onChangeText={setTextareaValue}/>
      {/*<div>{value}</div>*/}
      <div style={{display: 'none'}} dangerouslySetInnerHTML={{__html: value}}/>
      <div>
        <Button onClick={() => postScript(textareaValue)}>Save</Button>
      </div>
    </Wrap>
  );
}

export async function getServerSideProps() {
  try {
    const {value} = await getMethodSomeApi();
    return {
      props: {
        value
      }
    };
  } catch (error) {
    return handleServerSideError(error);
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(TextArea)`
  width: 300px;
  height: 300px;
  border: 1px solid ${props => props.theme.main};
`;
