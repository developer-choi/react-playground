import React, {createContext, useContext} from 'react';
import type {GetServerSideProps} from 'next';
import {useAppSelector} from '@store/hooks';

/**
 * 에러가 발생한 자식 컴포넌트만 숨길 수 있고,
 * 부모컴포넌트에서는 이것을 캐치하고싶다면...
 * JSX문법 포기하고 함수호출로 컴포넌트를 반환해야하는데... 그럴순없음.
 */

// URL: http://localhost:3000/study/react/error-in-component/nested-error
export default function Page() {
  try {
    return Parent1()
    // return (
    //   <Parent1/>
    // )
  } catch (error) {
    return (
      <div>Error occurred</div>
    )
  }
}

function Parent1() {
  return Parent2()
  // return (
  //   <Parent2/>
  // )
}

function Parent2() {
  return ErrorComponent()
}

const TestContext = createContext({
  data: 'hello world'
})

function ErrorComponent(): null {
  const state = useAppSelector(state => state)
  console.log('state', state);

  const context = useContext(TestContext)
  console.log('context', context);

  throw new Error('Error occurred');
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};