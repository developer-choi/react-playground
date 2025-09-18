import {BoardTable} from '@/types/services/board';
import {FileHandle, readFile as fsReadFile, writeFile as fsWriteFile} from 'fs/promises';
import {PathLike} from 'node:fs';

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

// 매번 fs 모듈 다루는거 까먹어서 만듬
async function readFile<T>(path: PathLike | FileHandle) {
  const data = await fsReadFile(path, {
    encoding: 'utf-8'
  });
  return JSON.parse(data) as T;
}

async function writeFile(path: PathLike | FileHandle, data: string | object) {
  return fsWriteFile(path, typeof data === 'string' ? data : JSON.stringify(data));
}
