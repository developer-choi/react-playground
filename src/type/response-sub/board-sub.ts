export interface Board {
  pk: number;
  title: string;
  content: string;
  timestamp: number;
  boardType: BoardType;
  isLike: boolean;
  authorUserPk: number;
}

/** Naming Rule
 * [api path] + Param
 */
export type BoardCreateParam = Pick<Board, 'title' | 'content' | 'boardType'>;

/**
 * 자유게시판 / 공지사항
 */
export type BoardType = 'FREE' | 'NOTICE';

export type BoardSearchTab = 'title' | 'content' | 'author';
