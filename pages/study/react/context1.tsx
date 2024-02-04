import React, {memo} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';

/**
 * URL: http://localhost:3000/study/react/context1
 * context value가 바뀌어도 렌더링이 안되는지 되는지 테스트한 예제
 */
export default function Home() {
  const methods = useForm<TestFormData>();

  console.log('checkbox value', methods.watch('test'));

  return (
    <FormProvider {...methods}>
      <form>
        <GeneralComponent/>
        <MemoComponent1/>
        <NestedComponent/>
        <input type="checkbox" {...methods.register('test')}/>
      </form>
    </FormProvider>
  )
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}

interface TestFormData {
  test: boolean
}

// memo 안씌우면 부모 컴포넌트가 watch()로 인해 리렌더링될 때 따라서 리렌더링되는거 똑같음
function GeneralComponent() {
  console.log('GeneralComponent rendered');
  return null
}

// memo 씌우면 부모 컴포넌트가 watch()로 인해 리렌더링될 때 따라서 리렌더링안됨.
const MemoComponent1 = memo(function MemoComponent() {
  console.log('MemoComponent1 rendered');
  return null;
});

// 심지어 자식에서 useContext로 데이터 가져와도 부모 자체에서는 props 바뀐게없어서 리렌더링안됨
const NestedComponent = memo(function MemoComponent() {
  console.log('NestedComponent rendered');
  return <NestedComponent2/>;
});

// useContext로 가져오는 컴포넌트만 리렌더링됨.
function NestedComponent2() {
  const {watch} = useFormContext<TestFormData>()
  console.log('NestedComponent2 rendered', watch('test'));
  return null;
}
