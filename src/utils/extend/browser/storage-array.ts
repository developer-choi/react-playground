import {useCallback} from 'react';
import {PkType, removeDuplicatedObject} from '@/utils/extend/data-type/array';
import {
  StorageObjectManager,
  StorageObjectParameter,
  useStorageObjectManager
} from '@/utils/extend/browser/storage-object';

export interface StorageArrayParameter<I extends object, P extends PkType> {
  key: string;
  storage: StorageObjectParameter<I[]>['storage'];

  /**
   * array의 item을 구분할 수 있는 유니크한 값으로 변환해주는 함수
   * 대부분의 경우, array의 item의 pk 키값을 반환하도록 지정.
   * 내부적으로 item끼리 구분하는 용도로만 사용함.
   */
  getUnique: (item: I) => P;
  enableDuplicated: boolean;
}

/**
 * @description 스토리지에 Array를 쉽고 안전하게 읽고 쓰기위해 만들었습니다.
 */
export class StorageArrayManager<I extends object, P extends PkType> extends StorageObjectManager<I[]> {
  /**
   * @private The getUnique must not be accessible in public.
   * And I don't have any plan that makes derived classes extend this class. (= This is the reason that I don't set visibility to protected)
   * For the above two reasons, I set visibility to private.
   */
  private readonly getUnique: StorageArrayParameter<I, P>['getUnique'];
  private readonly enableDuplicated: StorageArrayParameter<I, P>['enableDuplicated'];

  constructor({key, enableDuplicated, getUnique, storage}: StorageArrayParameter<I, P>) {
    super({key, defaultValue: [], storage});
    this.getUnique = getUnique;
    this.enableDuplicated = enableDuplicated;
  }

  getParsedData(): I[] {
    try {
      const array = super.getParsedData();

      if (array === null || !Array.isArray(array)) {
        return [];

      } else {
        return array;
      }
    } catch (error) {
      return [];
    }
  }

  removeByPk(pk: P): I[] {
    const list = this.getParsedData().filter(prev => this.getUnique(prev) !== pk);
    this.setStringifyItem(list);
    return list;
  }

  appendLast(item: I): I[] {
    const items = [...this.getParsedData(), item];
    const list = this.enableDuplicated ? items : removeDuplicatedObject(items, this.getUnique, 'last');
    this.setStringifyItem(list);
    return list;
  }

  appendFirst(item: I): I[] {
    const items = [item, ...this.getParsedData()];
    const list = this.enableDuplicated ? items : removeDuplicatedObject(items, this.getUnique, 'first');
    this.setStringifyItem(list);
    return list;
  }
}

/**
 * @description
 * StorageArrayManager: 단순히 스토리지에 읽고 쓰는것만 도와줍니다.
 * useStorageArrayManager: 스트토리지에 저장된 값이 변할때 화면도 따라 변하는것을 쉽게 구현하도록 도와줍니다.
 */
export function useStorageArrayManager<I extends object, P extends PkType>(manager: StorageArrayManager<I, P>) {
  const {state, changeState, isHydrating} = useStorageObjectManager(manager);

  const appendFirst = useCallback((item: I) => {
    changeState(manager.appendFirst(item));
  }, [manager, changeState]);

  const appendLast = useCallback((item: I) => {
    changeState(manager.appendLast(item));
  }, [manager, changeState]);

  const removeByPk = useCallback((pk: P) => {
    changeState(manager.removeByPk(pk));
  }, [manager, changeState]);

  return {
    list: state,
    isHydrating,
    appendFirst,
    appendLast,
    removeByPk
  };
}
