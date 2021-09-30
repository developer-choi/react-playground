import type {GetServerSidePropsContext} from 'next';
import nookies from 'nookies';

export function getCookie(key: string, context?: GetServerSidePropsContext): string | undefined {
  return nookies.get(context)[key];
}

export function parseCookie(key: string, context?: GetServerSidePropsContext): any | null {
  const cookie = getCookie(key, context);
  
  try {
    if (!cookie) {
      return null;
    }
    
    return JSON.parse(cookie);
    
  } catch (error) {
    return null;
  }
}
