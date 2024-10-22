import {readFile, writeFile} from '@/utils/server/file';
import {BoardTable} from '@/types/services/board';

const database = {
  board: {
    get: function getBoard() {
      return readFile<BoardTable>('database/board.json');
    },
    set: async function setBoard(board: BoardTable) {
      return writeFile('database/board.json', JSON.stringify(board));
    }
  },
};

export default database;
