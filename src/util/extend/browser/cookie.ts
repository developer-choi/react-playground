import type {GetServerSidePropsContext} from 'next';
import * as nookies from 'nookies';
import Cookies, {CookieAttributes} from 'js-cookie';

export function getCookie(name: string, context?: GetServerSidePropsContext) {
  if (context) {
    return nookies.parseCookies(context)[name];
  } else {
    return Cookies.get(name);
  }
}

export function removeCookie(name: string, context?: GetServerSidePropsContext) {
  if (context) {
    nookies.destroyCookie(context, name);

  } else {
    Cookies.remove(name);
  }
}

export function setCookie({context, name, value, options}: {name: string, value: string | Object, options?: CookieAttributes, context?: GetServerSidePropsContext}) {
  const _value = typeof value === 'string' ? value : JSON.stringify(value);

  if (context) {
    nookies.setCookie(context, name, _value, options)

  } else {
    Cookies.set(name, _value, options)
  }
}
