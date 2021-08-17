export class LocalStorageManager {
  protected readonly key: string;
  
  constructor(key: string) {
    this.key = key;
  }
  
  setItem(value: string) {
    localStorage.setItem(this.key, value);
  }
  
  getItem() {
    return localStorage.getItem(this.key);
  }
  
  removeItem () {
    localStorage.removeItem(this.key);
  }
}

export class LocalStorageObjectManager<V> extends LocalStorageManager{
  setStringifyItem(value: V) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  
  parseItem() {
    const item = localStorage.getItem(this.key);
    return item ? JSON.parse(item) as V : null;
  }
}

export class LocalStorageArrayManager<E, P> extends LocalStorageObjectManager<E[]> {
  protected readonly pkExtractor: (element: E) => P;
  
  constructor(key: string, pkExtractor: (element: E) => P) {
    super(key);
    this.pkExtractor = pkExtractor;
  }
  
  parseItem(): E[] {
    const array = super.parseItem();
  
    if (array === null) {
      return [];
      
    } else {
      return array;
    }
  }
  
  removeElementByPk(pk: P) {
    const list = this.parseItem().filter(prev => this.pkExtractor(prev) !== pk);
    this.setStringifyItem(list);
    return list;
  }
  
  removeElement(element: E) {
    return this.removeElementByPk(this.pkExtractor(element));
  }
}

interface Board {
  pk: number;
  title: string;
}

// Make your preset managers.
export const boardManager = new LocalStorageArrayManager('text', (board: Board) => board.pk);
