/**
 * @param element {HTMLElement}
 * @param offset 주로 fixed나 sticky의 헤더 높이값때문에 필요함
 *
 * @description element의 정확한 상단으로 오차없이 스크롤됩니다. 그래서, 상단에 뭐 가리는 요소 (fixed 등)가 있다면 그만큼 offset으로 전달하면 됩니다.
 */
export function scrollToElement(element: HTMLElement | null, offset = 0) {
  if (!element) {
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}
