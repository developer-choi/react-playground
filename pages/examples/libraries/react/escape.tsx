import React, {useCallback, useState} from 'react';
import TextArea from '@component/extend/TextArea';
import Button from '@component/atom/button/Button';
import styled from 'styled-components';
import MethodApi from '@api/MethodApi';

export default function Page({value}: {value: any}) {
  const [textareaValue, setTextareaValue] = useState(`<script>
console.log("Textarea XSS Attack");
</script>`);

  const postScript = useCallback(async (value: string) => {
    const api = new MethodApi();
    return api.postSome({value});
  }, []);

  return (
    <Wrap>
      <StyledTextArea value={textareaValue} onChangeText={setTextareaValue}/>
      {/*<div>{value}</div>*/}
      <div dangerouslySetInnerHTML={{__html: value}}/>
      <div>
        <Button onClick={() => postScript(HELLO_SCRIPT)}>Apply HelloScript</Button>
        <Button onClick={() => postScript(textareaValue)}>Apply Textarea</Button>
      </div>
    </Wrap>
  );
}

export async function getServerSideProps() {
  const api = new MethodApi();
  const {data} = await api.getSome();
  return {
    props: {
      value: data.value
    }
  };
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const HELLO_SCRIPT = `
<script>
console.log('XSS Attack');
</script> 
  `;

const StyledTextArea = styled(TextArea)`
  width: 300px;
  height: 300px;
  border: 1px solid ${props => props.theme.main};
`;
