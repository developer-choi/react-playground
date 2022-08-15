import type {GetServerSidePropsContext} from 'next';
import {parseCookies} from 'nookies';
import Cookies from 'js-cookie';

export function getCookie(name: string, context?: GetServerSidePropsContext) {
  if (context) {
    return parseCookies(context)[name];
  } else {
    return Cookies.get(name);
  }
}
