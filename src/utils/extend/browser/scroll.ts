/**
 * @param selector #id .class 등
 * @param offset 주로 fixed나 sticky의 헤더 높이값때문에 필요함
 * @throws HTMLError selector를 찾을 수 없을 때 발생
 */
export function scrollToElement(selector: string, offset = 0) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`selector not found: ${selector}`);
    throw new HTMLError('스크롤 이동을 할 수 없습니다.');
  }

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

/// TODO 이거 어느폴더에 어떻게 분류할지, 그리고 에러를 HTMLError로 하는게맞는지 (다른에러랑 통합해야하는지 잘 모르겠음)
class HTMLError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
