import {type ComponentPropsWithoutRef, type PropsWithChildren, useCallback} from 'react';
import {useIsFetching, useIsMutating, useMutation, useQueryClient} from '@tanstack/react-query';
import classNames from 'classnames';

export default function Home() {
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation(postApi)

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
      <Button onClick={post}>POST</Button>
    </div>
  )
}

function Button({onClick, children}: PropsWithChildren<any>) {
  // https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientisfetching
  const mutatingCount = useIsMutating()
  const fetchingCount = useIsFetching()
  console.log(mutatingCount, fetchingCount);

  return (
    <button onClick={onClick}>{children}</button>
  )
}

// 방법1. 버튼 내부에서 그냥 자동으로 쓴다.
function ExperimentalButton1({className, disabled, children, ...rest}: ComponentPropsWithoutRef<'button'>) {
  const isMutating = useIsMutating() > 0
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
    setTimeout(resolve, 3000);
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
