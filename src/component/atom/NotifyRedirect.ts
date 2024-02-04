import {useEffect} from 'react';
import {useRouter} from 'next/router';

export interface NotifyRedirectProps {
  notifyRedirect: {
    message?: string;
    destination: string;
  };
}

export default function NotifyRedirect({notifyRedirect}: NotifyRedirectProps) {
  const {replace} = useRouter();
  
  useEffect(() => {
    const {message, destination} = notifyRedirect;

    if (message) {
      alert(message);
    }

    replace(destination).then();
  }, [notifyRedirect, replace]);

  if (!notifyRedirect) {
    console.warn('Do not render this component unless notifyRedirect props exists.')
  }

  return null;
}
