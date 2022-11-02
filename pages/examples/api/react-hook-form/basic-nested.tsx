import {Button} from '@component/atom/button/button-presets';
import {SubmitHandler, useForm} from 'react-hook-form';
import styled from 'styled-components';
import {useForceReRender} from '@util/custom-hooks/useForceReRender';
import {useCallback} from 'react';

export default function Page() {
  const {register, handleSubmit, watch} = useForm<Data>();

  const forceReRender = useForceReRender();

  // 최초 렌더링시에 둘 다 기본값이 undefined이지만, submit data는 기본값이 다 ''로 들어가서 상관없다.
  const onSubmit: SubmitHandler<Data> = useCallback((data) => {
    console.log('submit', data);
  }, []);

  // 최초 렌더링시에 둘 다 기본값이 undefined이며, 이후 렌더링 부터는 기본값으로 ''가 들어간다.
  console.log(watch(), watch('info.name'), watch('info.nickname'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('info.name')}/>
      <Input {...register('info.nickname')}/>
      <Button type="submit">Submit</Button>
      <Button onClick={forceReRender}>Force re-render</Button>
    </form>
  );
}

interface Data {
  info: {
    name: string;
    nickname: string;
  };
}

const Input = styled.input`
  border: 1px solid black;
  padding: 5px;
`;
