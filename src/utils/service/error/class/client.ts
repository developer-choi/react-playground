import {CustomizedError} from '@/utils/service/error/class/index';

/**
 * @class HTMLElementNotFoundError
 * @description CSS 셀렉터로 DOM 요소를 찾지 못했을 때 발생하는 사용자 정의 에러입니다.
 */
export class HTMLElementNotFoundError extends CustomizedError {
  readonly name = 'HTMLElementNotFoundError';

  /**
   * @description 검색에 실패한 CSS 셀렉터입니다.
   */
  readonly selector: string;

  constructor({selector, message}: {selector: string; message?: string}) {
    // 영문법에 맞고 명확한 메시지로 수정
    super(message ?? `Could not find the element for selector: "${selector}"`);
    this.selector = selector;
  }
}