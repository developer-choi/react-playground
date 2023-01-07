import type {GetServerSidePropsContext} from 'next';
import {destroyCookie, parseCookies} from 'nookies';
import Cookies from 'js-cookie';

export function getCookie(name: string, context?: GetServerSidePropsContext) {
  if (context) {
    return parseCookies(context)[name];
  } else {
    return Cookies.get(name);
  }
}

export function removeCookie(name: string, context?: GetServerSidePropsContext) {
  if (context) {
    destroyCookie(context, name);

  } else {
    Cookies.remove(name);
  }
}
