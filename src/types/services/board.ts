// 저장되는 json 데이터 타입
export interface BoardTable {
  list: BoardRow[];
}

export interface BoardRow {
  pk: number;
  title: string;
  type: 'free' | 'gallery';
}

export const BOARD_TYPE_RECORD: Record<BoardRow['type'], string> = {
  free: '자유게시판',
  gallery: '갤러리형 게시판'
};

export type PostBoardApiRequest = Omit<BoardRow, 'pk'>;
export type PatchBoardApiRequest = BoardRow;

export interface BoardListApiResponse {
  list: BoardRow[];
  currentTime: string; // YYYY-MM-DD HH:mm:ss
}