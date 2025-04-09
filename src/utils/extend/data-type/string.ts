/**
 * @example ('/tutorial', '/tutorial/sub') ==> true (가장 의도했던 예시)
 * @example ('/tutorial', '/tutorial-sub') ==> false (예외 1)
 * @example ('/', '/로 시작하는 임의의 문자열') ==> true (예외 2)
 */
export function doesPathStartWithSegment(base: string, target: string): boolean {
  const basePathname = extractPathname(base);
  const targetPathname = extractPathname(target);

  if (basePathname === '/') {
    return true;
  }

  if (targetPathname === basePathname) {
    return true;
  }

  return targetPathname.startsWith(`${basePathname}/`);
}

/**
 * @description Extracts the pathname from a URL string. Consecutive slashes ('//') in the pathname are not allowed.
 * @example extractPathname('/some/path?query=value') => '/some/path'
 * @example extractPathname('https://www.naver.com/some/path?query=value') => '/some/path'
 * @throws TypeError if the pathname includes consecutive slashes (e.g., '/some//path')
 * @throws TypeError if the input is not a valid pathname or URL
 */
export function extractPathname(url: string) {
  const { pathname } = new URL(url.startsWith('http') ? url : `http://some.domain.com${url}`);

  if (pathname.includes('//')) {
    throw new TypeError('Pathname must not contain consecutive slashes ("//").');
  }

  return pathname;
}

// 특히 시간 표시할 때 엄청 많이 씀.
export function padToTwoDigits(value: string | number) {
  return (typeof value === 'number' ? value.toString() : value).padStart(2, '0');
}

// sortByNumber와 활용해서 많이나온 키워드로 정렬해서 보여줄 수 있음.
export function classifyStrings(array: string[]): {value: string, count: number}[] {
  return Object.entries(array.reduce((a, b) => {
    if (a[b]) {
      a[b]++;
      return a;
    } else {
      a[b] = 1;
      return a;
    }
  }, {} as Record<string, number>)).map(([key, value]) => ({
    value: key,
    count: value
  }));
}

/**
 * Extracts characters from the input string that are in the allowed set.
 * If the first character is not allowed, an empty string is returned.
 *
 * @example ('123abc', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) => '123'
 */
export function extractAllowedCharacters(input: string, allowedChars: string[]): string {
  let result = '';

  for (const char of input) {
    if (!allowedChars.includes(char)) {
      break;
    }
    result += char;
  }

  return result;
}

/**
 * @example ('000123abc456') ==> '000123456'
 */
export function extractNumericCharacters(input: string) {
  return extractAllowedCharacters(input, NUMBER_CHARS);
}

const NUMBER_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
