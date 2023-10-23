import React, {createContext, FunctionComponent, useContext} from 'react';
import type {GetServerSideProps} from 'next';
import {useAppSelector} from '@store/hooks';

// URL: http://localhost:3000/study/react/error-in-component/wrap-fallback

/**
 * 에러가 발생한 자식 컴포넌트만 숨길 수 있고,
 * 부모컴포넌트에서는 이것을 캐치할 수 없음.
 *
 * 만약 부모에서 캐치하고싶다면,
 * nested-error.tsx 참고 (사실상 불가능)
 */

export default function Page() {
  return (
    <TestContext.Provider value={{data: 'hello world'}}>
      <Parent1/>
    </TestContext.Provider>
  )
}

const TestContext = createContext({
  data: 'hello world'
})

function Parent1() {
  return (
    <WrappedComponent/>
  )
}

const WrappedComponent = wrapFallbackComponent(ErrorComponent)

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
      return (
        <div>Error occurred</div>
      )
    }
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
    }
  };
};
