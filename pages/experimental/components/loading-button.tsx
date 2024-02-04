import {type ComponentPropsWithoutRef, type PropsWithChildren, useCallback} from 'react';
import {type MutationKey, useIsFetching, useIsMutating, useMutation, useQueryClient} from '@tanstack/react-query';
import classNames from 'classnames';
import styled from 'styled-components';

export default function Home() {
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation(postApi, {
    mutationKey: ['123']
  })

  const get = useCallback(async () => {
    await queryClient.fetchQuery({
      queryKey: ['get'],
      queryFn: getApi
    });
    console.log('get end');
  }, [queryClient]);

  const post = useCallback(async () => {
    await mutateAsync()
    console.log('post end');
  }, [mutateAsync]);

  return (
    <div>
      <Button onClick={get}>GET</Button>
      <ExperimentalButton1 onClick={post} enableMutating>POST1</ExperimentalButton1>
      <ExperimentalButton1 onClick={post} enableMutating={['123']}>POST2</ExperimentalButton1>
      <ExperimentalButton1 onClick={post} enableMutating={['none']}>POST3</ExperimentalButton1>
    </div>
  )
}

function Button({onClick, children}: PropsWithChildren<any>) {
  // https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientisfetching
  const mutatingCount = useIsMutating({
    mutationKey: ['13']
  })
  const fetchingCount = useIsFetching()
  console.log(mutatingCount, fetchingCount);

  return (
    <button onClick={onClick}>{children}</button>
  )
}

interface MutatingButtonOption {
  enableMutating?: true | MutationKey;
}

// 방법1. 버튼 내부에서 그냥 자동으로 쓴다.
function ExperimentalButton1({className, disabled, children, enableMutating, ...rest}: ComponentPropsWithoutRef<'button'> & MutatingButtonOption) {
  const mutatingCount = useIsMutating(typeof enableMutating === 'boolean' ? undefined : {
    mutationKey: enableMutating
  });
  const isMutating = !enableMutating ? false : mutatingCount > 0;

  return (
    <MutatingButton
      className={classNames({loading: isMutating}, className)}
      disabled={isMutating ?? disabled}
      {...rest}
    >
      {children}
    </MutatingButton>
  )
}

// 방법2. <Button isMutating={true} /> 이런식으로 상위컴포넌트에서 props로 쓸 수 있게 한다.
function ExperimentalButton2({className, disabled, children, isMutating, ...rest}: ComponentPropsWithoutRef<'button'> & {isMutating: boolean}) {
  return (
    <button
      className={classNames({loading: isMutating}, className)}
      disabled={isMutating ?? disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}

function timeoutPromise() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

async function getApi() {
  await timeoutPromise();
  return 'data';
}

async function postApi() {
  await timeoutPromise();
  return true;
}

const MutatingButton = styled.button`
  &.loading {
    cursor: progress;
  }
`;