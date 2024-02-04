import React, {type ComponentProps, forwardRef, type Ref, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import Button from '@component/atom/element/Button';

/**
 * URL: http://localhost:3000/study/react/forward-ref/basic
 *
 * ### <Input/> 을 통해 알 수 있는 점
 * 1. rhf는 사실 forwardRef없어도 ref 전달 잘 된다.
 *
 * ### <Input2/> 을 통해 알 수 있는 점
 * 2. 그렇지만 react에서는 props에 ref라는 키값으로 전달되면 forwardRef 쓰라고 경고를 한다.
 *
 * 3. 그러므로, Usage는 2개가 있음.
 * (1) 가장 기본적인 <input/>이나 checkbox나 이런 컴포넌트는 forwardRef로 만들 수밖에 없음. props 타입구조를 가장 기본적인 그 html tag와 똑같이 잡아야 하니까.
 * (2) 하지만 조금이라도 기능을 Wrapping한 컴포넌트는 "inputProps" 같은 키값으로 따로 받기때문에 forwardRef 없이 사용해도 됨. (예시로 <PasswordInput/>)
 * (2) - 1 하지만, forwardRef의 한계는 generic을 적용할 수 없음. 이에대한 자세한 얘기는 study/react/forward-ref/basic.tsx 참고
 */
export default function Page() {
  const {register, setFocus} = useForm<TestFormData>();

  const passwordProps = register('password');
  
  const onClick = useCallback(() => {
    setFocus('password')
  }, [setFocus]);

  return (
    <>
      <Input inputProps={passwordProps}/>
      {/*<Input2 {...passwordProps}/> 이거 주석풀면 런타임에서 브라우저 콘솔에서 에러뜸 */}
      <ForwardRefInput {...passwordProps}/>
      <Button onClick={onClick}>Focus</Button>
    </>
  );
}

interface TestFormData {
  password: string;
}

interface InputProps {
  inputProps: ComponentProps<'input'>;
}

function Input({inputProps}: InputProps) {
  return (
    <input {...inputProps}/>
  );
}

function Input2(inputProps: ComponentProps<'input'>, ref: Ref<HTMLInputElement>) {
  return (
    <input ref={ref} {...inputProps}/>
  )
}

const ForwardRefInput = forwardRef(Input2) as typeof Input2;
