/**
 * @param prevent 페이지 나갈 때 막아야하는지 여부
 */
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

interface PreventRouteChangeConfig {
  prevent: boolean;
}

function usePreventRouteChange({prevent}: PreventRouteChangeConfig) {
  const { events, push } = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!prevent) {
        push(url).then();
      } else {
        if (confirm('작성중이던 내용이 사라집니다.')) {
          push(url).then();
          return;
        }
        
        throw Error('Abort routeChangeStart. ignore this message');
      }
    }
    
    events.on('routeChangeStart', handleRouteChange);
    
    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, [prevent, dispatch, events, push]);
}
