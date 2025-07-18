/**
 * active = 현재 페이지와 일치
 * disabled = 못가는 페이지 (1 페이지에서 previous로 가는 링크는 불들어오면안됨
 * default = 그 외 나머지
 */
export type PageState = 'active' | 'disabled' | 'default';

export interface PageElement {
  page: number;
  state: PageState;
}

export interface PageElementWithHref {
  page: number;
  href: string;
  state: PageState;
}