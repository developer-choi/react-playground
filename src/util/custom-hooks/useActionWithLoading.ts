import {useCallback, useState} from 'react';

export default function useActionWithLoading(callback: () => Promise<void>, initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);
  
  const callbackWithLoading = useCallback(async () => {
    try {
      setLoading(true);
      await callback();
    } finally {
      setLoading(false);
    }
  }, [callback]);
  
  return {
    loading,
    callback: callbackWithLoading
  };
}
