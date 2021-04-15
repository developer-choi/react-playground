/**
 * usage
 * const {pathname} = useLocation();
 * const rootPath = getUrlPart(pathname);
 *
 * basic example
 * @example ("/apple/banana/kiwi", 2) ==> "/kiwi"
 * @example ("/apple/banana/kiwi") ==> "/apple"
 *
 * other case
 * @example ("/apple", 9) ==> ""
 * @example ("/") ==> ""
 * @example ("xxx") ==> ""
 */
export function getUrlPart(pathname: string, index = 0) {

  /**
   * 이렇게하면, 분명 getUrlPart(to ?? ''); 이렇게 코딩했다가 자꾸 워닝나서 짜증나서 이 콘솔로그 지우는사람 분명있다. 근데 이게맞음.
   * 값이 잘못된 경우에 그걸 굳이 함수에 패러미터로 넘겨서 호출할바에는 호출 안하는게 맞지.
   */
  if (!pathname.includes('/')) {
    console.warn('pathname에 /가 없습니다. pathname은 반드시 /를 포함해야하고, /로 path가 구분되어야합니다. 일반적인 사용법은 주석을 참고해주세요.');
    return '';
  }

  if (pathname === '/' && index === 0) {
    return '/';
  }

  const splits = pathname.split('/');

  if (splits.length - 1 < index) {
    return '';
  }

  const part = splits[index + 1];

  if (part === '') {
    console.warn('함수에 버그가 있습니다. 반환값이 빈문자열이 되는 경우의수를 덜 체크했습니다.');
    return '';
  }

  return '/' + part;
}
// console.log(getUrlPart('/')); expect /
// console.log(getUrlPart('/apple/banana/kiwi')); expect /apple
// console.log(getUrlPart('/apple/banana/kiwi', 1)); expect /banana
// console.log(getUrlPart('/apple/banana/kiwi', 2)); expect /kiwi
