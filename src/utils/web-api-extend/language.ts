
/**
 * 우선순위
 * 1. localstorage 매치
 * 2. 브라우저 언어 매치
 * 3.
 */

//이 값은 번역파일 이름과 동일해야함.
type SupportedLanguage = 'en' | 'kr';

const LANGUAGE_KEY = 'lang';
const SUPPORTED_LANGUAGE: SupportedLanguage[] = ['en', 'kr'];

//browser check할 떄 필요한 것들
const NAVIGATOR_LANGUAGE_KR = ['ko', 'ko-KR'];
const NAVIGATOR_LANGUAGE_EN = ['en', 'en-US'];

function getLanguage(fallback: SupportedLanguage = 'en'): SupportedLanguage {
  const langFromStorage = localStorage.getItem(LANGUAGE_KEY);

  //@ts-ignore
  if (SUPPORTED_LANGUAGE.includes(langFromStorage)) {
    return langFromStorage as SupportedLanguage;
  }

  //브라우저 매치 체크

  return fallback;
}
