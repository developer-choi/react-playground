export interface Board {
  pk: number;
  title: string;
  content: string;
  timestamp: number;
  boardType: BoardType;
  isLike: boolean;
  authorUserPk: number;
}

/**
 * 자유게시판 / 공지사항
 */
export type BoardType = 'FREE' | 'NOTICE';
