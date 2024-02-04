import {useRouter} from 'next/router';
import {useCallback} from 'react';

export function isServerSide() {
  try {
    localStorage;
    return false;
  } catch (error) {
    return true;
  }
}

export function getMessageOfBothSide() {
  if (isServerSide()) {
    return 'on Server Side';
  }

  return 'on Client Side';
}

export function useRefreshGetServerSideProps() {
  const {replace, asPath} = useRouter();

  return useCallback(async () => {
    await replace(asPath);
  }, [replace, asPath]);
}
