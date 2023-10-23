import React, {createContext, FunctionComponent, useContext} from 'react';
import type {GetServerSideProps} from 'next';
import {ErrorBoundary} from 'react-error-boundary';
import {useAppSelector} from '@store/hooks';

// URL: http://localhost:3000/study/react/error-in-component/throw-in-component

export default function Page() {
  return (
    <TestContext.Provider value={{data: 'hello world'}}>
      <CatchExample2/>
    </TestContext.Provider>
  )
}

const TestContext = createContext({
  data: 'hello world'
})

function CatchExample() {
  try {
    return ErrorComponent()
  } catch (error) {
    return (
      <div>Error is occurred</div>
    )
  }
}

const WrappedComponent = wrapFallbackComponent(ErrorComponent)

function CatchExample2() {
  return (
    <WrappedComponent/>
  )
}

function DontCatchExample1() {
  try {
    return (
      <ErrorComponent/>
    )
  } catch (error) {
    return (
      <div>Error is occurred</div>
    )
  }
}

function DontCatchExample2() {
  return (
    <ErrorBoundary fallback={<div>Error is occurred</div>}>
      <ErrorComponent/>
    </ErrorBoundary>
  )
}

function ErrorComponent(): null {
  const state = useAppSelector(state => state)
  console.log('state', state);

  const context = useContext(TestContext)
  console.log('context', context);

  throw new Error('Error occurred');
}

function wrapFallbackComponent<P>(component: FunctionComponent<P>): FunctionComponent<P> {
  return (props: P) => {
    try {
      return component(props)
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error('컴포넌트 렌더링하다가 에러가 발생함.', error)
        //에러가 발생한 컴포넌트 통째로 렌더링 시키지않기위함 (fallback UI를 별도로 노출할 필요가 생길 경우 그 때 추가개발하겠습니다.
        return null
      } else {
        //개발환경에서는 테스트를 위해 그대로 에러를 던집니다.
        throw error
      }
    }
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
    }
  };
};
