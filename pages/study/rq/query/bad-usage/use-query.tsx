import React, {useCallback, useEffect, useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';

export default function Page() {
  const queryClient = useQueryClient();
  const [response, setResponse] = useState<any>();

  const callApi = useCallback(async () => {
    const result = await queryClient.fetchQuery({
      queryKey: ['query-key'],
      queryFn: getApi
    });

    setResponse(result);
  }, [queryClient]);

  useEffect(() => {
    // 컴포넌트 마운트 시점에만 API 호출
    callApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>data: {response}</div>
  );
}

async function getApi() {
  return 'data';
}
