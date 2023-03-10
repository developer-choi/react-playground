import {PkType, removeDuplicatedObject} from '@util/extend/data-type/array';
import {LocalStorageObjectManager, useLocalStorageObjectManager} from '@util/extend/browser/local-storage-object';
import {Dispatch, SetStateAction, useCallback, useMemo} from 'react';

export interface ArrayManagerConstructorParameter<I extends Object, P extends PkType> {
  key: string;
  pkExtractor: (item: I) => P;
  enableDuplicated: boolean;
}

/**
 * @description 로컬스토리지에 Array를 쉽고 안전하게 읽고 쓰기위해 만들었습니다.
 */
export class LocalStorageArrayManager<I extends Object, P extends PkType> extends LocalStorageObjectManager<I[]> {
  /**
   * @private The pkExtractor must not be accessible in public.
   * And I don't have any plan that makes derived classes extend this class. (= This is the reason that I don't set visibility to protected)
   * For the above two reasons, I set visibility to private.
   */
  private readonly pkExtractor: ArrayManagerConstructorParameter<I, P>['pkExtractor'];
  private readonly enableDuplicated: ArrayManagerConstructorParameter<I, P>['enableDuplicated'];

  constructor({key, enableDuplicated, pkExtractor}: ArrayManagerConstructorParameter<I, P>) {
    super(key);
    this.pkExtractor = pkExtractor;
    this.enableDuplicated = enableDuplicated;
  }

  parseItem(): I[] {
    try {
      const array = super.parseItem();

      if (array === null || !Array.isArray(array)) {
        return [];

      } else {
        return array;
      }
    } catch (error) {
      if(!(error instanceof ReferenceError)) {
        console.error('An empty array was returned because an error occurred while JSON.parse().', error);
      }
      return [];
    }
  }

  removeByPk(pk: P): I[] {
    const list = this.parseItem().filter(prev => this.pkExtractor(prev) !== pk);
    this.setStringifyItem(list);
    return list;
  }

  appendLast(item: I): I[] {
    const items = [...this.parseItem(), item];
    const list = this.enableDuplicated ? items : removeDuplicatedObject(items.concat().reverse(), this.pkExtractor);
    this.setStringifyItem(list);
    return list;
  }

  appendFirst(item: I): I[] {
    const items = [item, ...this.parseItem()];
    const list = this.enableDuplicated ? items : removeDuplicatedObject(items.concat().reverse(), this.pkExtractor);
    this.setStringifyItem(list);
    return list;
  }
}

/**
 * @description
 * LocalStorageArrayManager: 단순히 로컬스토리지에 읽고 쓰는것만 도와줍니다.
 * useLocalStorageArrayManager: 로컬스트토리지에 저장된 값이 변할때 화면도 따라 변하는것을 쉽게 구현하도록 도와줍니다.
 */
export function useLocalStorageArrayManager<I extends Object, P extends PkType>({key, enableDuplicated, pkExtractor}: ArrayManagerConstructorParameter<I, P>, enabled = true) {
  const manager = useMemo(() => new LocalStorageArrayManager({
    key,
    enableDuplicated,
    pkExtractor

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [key, enableDuplicated]);

  const [state, setState] = useLocalStorageObjectManager(manager, {enabled, defaultValue: []}) as [I[], Dispatch<SetStateAction<I[]>>];

  const appendFirst = useCallback((item: I) => {
    setState(manager.appendFirst(item));
  }, [manager, setState]);

  const appendLast = useCallback((item: I) => {
    setState(manager.appendLast(item));
  }, [manager, setState]);

  const removeByPk = useCallback((pk: P) => {
    setState(manager.removeByPk(pk));
  }, [manager, setState]);

  return {
    list: state,
    appendFirst,
    appendLast,
    removeByPk
  };
}
