import {getUserLocale} from '@/utils/service/i18n/index';
import {Roboto, Noto_Sans} from 'next/font/google';

export async function getFontByLanguage() {
  const { short } = await getUserLocale();
  return FONT_RECORD[short];
}

const ko = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
});

const en = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['latin']
});

const FONT_RECORD = {
  ko,
  en
};
