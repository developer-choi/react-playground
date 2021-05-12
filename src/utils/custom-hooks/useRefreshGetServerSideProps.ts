import {useRouter} from 'next/router';
import {useCallback} from 'react';

export function useRefreshGetServerSideProps() {
  const {replace, asPath} = useRouter();
  
  return useCallback(async () => {
    await replace(asPath);
  }, [replace, asPath]);
}
