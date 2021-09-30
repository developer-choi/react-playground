export interface Board {
  pk: number;
  title: string;
  content: string;
  timestamp: number;
  boardType: BoardType;
}

export interface BoardAnother {
  someProperty: string;
}

/**
 * 자유게시판 / 공지사항
 */
export type BoardType = 'FREE' | 'NOTICE';
