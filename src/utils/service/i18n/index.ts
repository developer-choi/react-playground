import {getRequestConfig} from 'next-intl/server';
import {isServer} from '@/utils/extend/library/next';
import {handleIntlError} from '@/utils/service/i18n/handleIntlError';

// https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing
// https://next-intl-docs.vercel.app/docs/environments/server-client-components#non-serializable-props
export default getRequestConfig(async () => {
  const { short } = await getUserLocale();

  return {
    locale: short,
    messages: (await import(`/public/locales/${short}.json`)).default,
    onError: isServer() ? handleIntlError : undefined,
  };
});

export interface Locale {
  short: 'en' | 'ko'; // locales 폴더 아래에 있는 번역파일 이름
}

export async function getUserLocale(): Promise<Locale> {
  // try {
    // const { json } = await customFetchOnServerSide('/member', {authorize: 'private', method: 'GET'});
    // return {
    //   short: json.user.langauge
    // };
  // } catch (error: any) {
  //   return {
  //     short: 'en'
  //   };
  // }
  return {
    short: 'en'
  };
}
