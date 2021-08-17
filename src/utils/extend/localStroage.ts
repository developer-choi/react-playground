export class LocalStorageManager {
  /**
   * @private The key must not be accessible in public and derived classes.
   * In other words, derived classes are need not access the key.
   * Instead, derived classes can use super's methods.
   */
  private readonly key: string;
  
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
    this.setItem(JSON.stringify(value));
  }
  
  parseItem() {
    const item = this.getItem()
    return item ? JSON.parse(item) as V : null;
  }
}

export class LocalStorageArrayManager<E, P> extends LocalStorageObjectManager<E[]> {
  /**
   * @private The pkExtractor must not be accessible in public.
   * And I don't have any plan that makes derived classes extend this class. (= This is the reason that I don't set visibility to protected)
   * For the above two reasons, I set visibility to private.
   */
  private readonly pkExtractor: (element: E) => P;
  
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
