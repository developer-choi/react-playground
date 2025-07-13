import {HTMLElementNotFoundError} from '@/utils/service/error/class/client';

/**
 * @description 지정된 요소의 상단으로 부드럽게 스크롤합니다.
 *
 * @param {Element | string | null} target - 스크롤할 대상 요소(Element) 또는 CSS 셀렉터(string).
 * @param {number} [offset=0] - 최종 스크롤 위치에서 제외할 상단 간격. 상단에 고정된 헤더가 있을 때 유용합니다.
 *
 * @throws {HTMLElementNotFoundError} 셀렉터에 해당하는 요소를 찾지 못했을 때 발생합니다.
 * @throws {TypeError} `target`으로 `null` 또는 유효하지 않은 값이 전달되었을 때 발생합니다.
 */
export function scrollToElement(target: Element | string | null, offset = 0) {
  let targetElement: Element | null;

  if (typeof target === 'string') {
    targetElement = document.querySelector(target);

    if (!targetElement) {
      throw new HTMLElementNotFoundError({selector: target});
    }
  } else {
    targetElement = target;

    if (!targetElement) {
      throw new TypeError('Invalid target: Expected an Element but received null.');
    }
  }

  const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}