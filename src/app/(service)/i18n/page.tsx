import {getTranslations} from 'next-intl/server';
import I18nClientTest from '@/app/(service)/i18n/I18nClientTest';

export default async function Page() {
  const t = await getTranslations();

  return (
    <>
      <div>{t('key1.key2.static')}</div>
      <div>{t('key1.key2.dynamic', {some: 'dynamic'})}</div>
      <div>{t('not found code1')}</div>
      <I18nClientTest/>
    </>
  );
}
