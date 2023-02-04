import {useEffect} from 'react';

export default function useLogMount(name: string) {
  useEffect(() => {
    console.log(`${name} mounted`);

    return () => {
      console.log(`${name} unmounted`);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
