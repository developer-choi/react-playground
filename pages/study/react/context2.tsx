import React, {createContext, memo, useContext, useState} from 'react';

/**
 * URL: http://localhost:3000/study/react/context2
 * context value가 바뀌어도 렌더링이 안되는지 되는지 테스트한 예제
 */
export default function Home() {
  const [value, setValue] = useState('');

  return (
    <TestContext.Provider value={{value, setValue, anotherValue: 'hello world'}}>
      <Child/>
      <AnotherWrapper/>
    </TestContext.Provider>
  );
}

interface TestContextType {
  value: string;
  setValue: (value: string) => void;
  anotherValue: string;
}

const TestContext = createContext<TestContextType>({
  value: '',
  setValue: () => {
  },
  anotherValue: ''
});

export async function getServerSideProps() {
  return {
    props: {}
  };
}

function Child() {
  const {setValue, value} = useContext(TestContext);

  return (
    <input value={value} onChange={event => setValue(event.target.value)}/>
  );
}

// Context의 일부 value만 구독하려고 하는경우 이렇게 한번 감싸서 내려주면 해결가능, 안그러면 렌더링최적화 안됨
function AnotherWrapper() {
  const {anotherValue} = useContext(TestContext);

  return (
    <AnotherChild anotherValue={anotherValue}/>
  );
}

const AnotherChild = memo(function AnotherChild(props: any) {
  console.log('AnotherChild rendered', props);
  return null;
});
