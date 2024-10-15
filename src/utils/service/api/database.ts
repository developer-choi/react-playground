import {readFile, writeFile} from 'fs/promises';
import {BoardTable} from '@/types/services/board';

const database = {
  board: {
    get: async function getBoard() {
      const data = await readFile('database/board.json', {
        encoding: 'utf-8'
      });

      return JSON.parse(data) as BoardTable;
    },
    set: async function setBoard(board: BoardTable) {
      return writeFile('database/board.json', JSON.stringify(board));
    }
  },
};

export default database;
