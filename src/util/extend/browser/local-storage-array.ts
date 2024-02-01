import {PkType, removeDuplicatedObject} from "@util/extend/data-type/array";
import {LocalStorageObjectManager, useLocalStorageObjectManager} from "@util/extend/browser/local-storage-object";
import {useCallback} from "react";

interface LocalStorageArrayParameter<I extends Object, P extends PkType> {
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
  private readonly pkExtractor: LocalStorageArrayParameter<I, P>["pkExtractor"];
  private readonly enableDuplicated: LocalStorageArrayParameter<I, P>["enableDuplicated"];

  constructor({key, enableDuplicated, pkExtractor}: LocalStorageArrayParameter<I, P>) {
    super({key, defaultValue: []});
    this.pkExtractor = pkExtractor;
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
    const list = this.getParsedData().filter((prev) => this.pkExtractor(prev) !== pk);
    this.setStringifyItem(list);
    return list;
  }

  appendLast(item: I): I[] {
    const items = [...this.getParsedData(), item];
    const list = this.enableDuplicated ? items : removeDuplicatedObject(items, this.pkExtractor, "last");
    this.setStringifyItem(list);
    return list;
  }

  appendFirst(item: I): I[] {
    const items = [item, ...this.getParsedData()];
    const list = this.enableDuplicated ? items : removeDuplicatedObject(items, this.pkExtractor, "first");
    this.setStringifyItem(list);
    return list;
  }
}

/**
 * @description
 * LocalStorageArrayManager: 단순히 로컬스토리지에 읽고 쓰는것만 도와줍니다.
 * useLocalStorageArrayManager: 로컬스트토리지에 저장된 값이 변할때 화면도 따라 변하는것을 쉽게 구현하도록 도와줍니다.
 */
export function useLocalStorageArrayManager<I extends Object, P extends PkType>(manager: LocalStorageArrayManager<I, P>) {
  const {state, changeState} = useLocalStorageObjectManager(manager);

  const appendFirst = useCallback(
    (item: I) => {
      changeState(manager.appendFirst(item));
    },
    [manager, changeState]
  );

  const appendLast = useCallback(
    (item: I) => {
      changeState(manager.appendLast(item));
    },
    [manager, changeState]
  );

  const removeByPk = useCallback(
    (pk: P) => {
      changeState(manager.removeByPk(pk));
    },
    [manager, changeState]
  );

  return {
    list: state,
    appendFirst,
    appendLast,
    removeByPk
  };
}
