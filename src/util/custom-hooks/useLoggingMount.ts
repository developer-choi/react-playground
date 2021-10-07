import {useEffect} from 'react';

export default function useLoggingMount(id: string | number) {
  useEffect(() => {
    console.log(`${id} mounted`);
  
    return () => {
      console.log(`${id} has unmounted`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
