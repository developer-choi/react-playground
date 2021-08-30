import styled from 'styled-components';
import LoadingButton from '@components/atom/button/LoadingButton';
import { useCallback, useState } from 'react';
import useActionWithLoading from '../../../src/utils/custom-hooks/useActionWithLoading';
import { timeoutPromise } from '../../../src/utils/extend/promise';
import InputText from '@components/extend/InputText';
import { toast } from 'react-toastify';
import Form from '@components/extend/Form';

export default function LoadingButtonPage() {
  
  const [name, setName] = useState('');
  
  const { callback, loading } = useActionWithLoading(useCallback(async () => {
    console.log('click');
    if (!name) {
      toast.error('이름을 입력해주세요!', { toastId: 'NAME' });
      return;
    }
    
    await timeoutPromise(1000);
    alert(`이름 : ${name}`);
  }, [name]));
  
  return (
    <Wrap>
      <Input value={name} onChangeText={setName} placeholder="이름을 입력해주세요"/>
      <CustomButton type="submit" loading={loading} onClick={callback}>제출</CustomButton>
    </Wrap>
  );
}

const Wrap = styled(Form)`
  height: 100%;
  background-color: transparent;
`;

const CustomButton = styled(LoadingButton)`
  background-color: ${props => props.theme.main};
  height: 40px;
  padding-inline: 30px;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled(InputText)`
  border: 3px solid black;
  padding: 10px;
`;
