import React, {useCallback, useState} from 'react';
import TextArea from '@component/extend/TextArea';
import Button from '@component/atom/element/Button';
import styled from 'styled-components';
import MethodApi from '@api/MethodApi';
import {useRouter} from 'next/router';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';

export default function Page({value}: {value: any}) {
  const {reload} = useRouter();

  const [textareaValue, setTextareaValue] = useState(`<script>
alert("Textarea XSS Attacked");
</script>`);

  const postScript = useCallback(async (value: string) => {
    const api = new MethodApi();
    await api.postSome({value});
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
  const api = new MethodApi();
  try {
    const {data} = await api.getSome();
    return {
      props: {
        value: data.value
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
