'use client';

import {useTranslations} from 'next-intl';
import {useCallback} from 'react';

export default function I18nClientTest() {
  const t = useTranslations();

  const onClick = useCallback(() => {
    console.log(t('key1.key2.static'));
    console.log(t('key1.key2.dynamic', {some: 'some'}));
    // console.log(t('not found code 2'));
  }, [t]);
  
  return (
    <>
      <div>{t('key1.key2.static')}</div>
      <div>{t('key1.key2.dynamic', {some: 'some'})}</div>
      <button onClick={onClick}>Click Me</button>
    </>
  )
}