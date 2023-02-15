import Button from '@component/atom/element/Button';
import {useCallback} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {timeoutPromise} from '@util/extend/test';

export default function Page() {
  const queryClient = useQueryClient();

  const callApi = useCallback(async () => {
    await queryClient.fetchQuery({
      queryKey: ['some-api'],
      queryFn: () => api(1),
      staleTime: 1000
    });
  }, [queryClient]);

  return (
    <div>
      <Button onClick={callApi}>광클해보기</Button>
    </div>
  );
}

async function api(parameter: number) {
  console.log('call API', parameter);
  timeoutPromise(200);

  return {
    data: 'value'
  };
}
