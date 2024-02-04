import type {GetServerSidePropsContext} from 'next';
import * as nookies from 'nookies';
import Cookies, {CookieAttributes} from 'js-cookie';
import type {CookieSerializeOptions} from "cookie";

export function getCookie(name: string, context?: GetServerSidePropsContext) {
  if (context) {
    return nookies.parseCookies(context)[name];
  } else {
    return Cookies.get(name);
  }
}

export function removeCookie(name: string, context?: GetServerSidePropsContext) {
  if (context) {
    nookies.destroyCookie(context, name, {
      path: '/'
    });

  } else {
    Cookies.remove(name, {
      path: '/'
    });
  }
}

export function setCookie({context, name, value, options}: {name: string, value: string | Object, options?: CookieAttributes, context?: GetServerSidePropsContext}) {
  const _value = typeof value === 'string' ? value : JSON.stringify(value);

  if (context) {
    nookies.setCookie(context, name, _value, {
      path: '/',
      ...options,
      expires: options?.expires === undefined ? undefined : new Date(options.expires),
      sameSite: options?.sameSite?.toLowerCase() as CookieSerializeOptions['sameSite'],
    })

  } else {
    Cookies.set(name, _value, {
      path: '/',
      ...options,
    })
  }
}
