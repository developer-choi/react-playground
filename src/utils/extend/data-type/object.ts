export function isObject(error: unknown): error is object {
  /**
   * 내가 던지거나, Javascript 실행하다 던져진 에러의 경우, 거의 모두 object 타입으로 에러가 던져짐. (대부분이 Error 하위클래스)
   * 일단 object가 아닌걸 여기서 걸러서 그 다음 실행문에서 in이나 instqnceof 연산자로 체크하기 위함.
   *
   * TS 5.4.5 버전 기준, error가 unknown 타입이면
   * in 연산자는 개발자에게 타입에러있다고 알려주는데
   * instanceof 연산자는 개발자에게 아무런 에러를 안알려줌.
   */
  return typeof error === 'object' && error !== null;
}

export function reverse<K extends string, V extends string>(target: Record<K, V>): Record<V, K> {
  const targetKeys = Object.keys(target) as K[];
  return targetKeys.reduce((a, key) => {
    const value = target[key];
    // eslint-disable-next-line no-param-reassign
    a[value] = key;
    return a;
  }, {} as Record<V, K>);
}

/**
 * 정적으로 메뉴에 표시되는 데이터를 바로 보여줄 수 있도록 가공하기 위한 함수입니다.
 * parameter를 record로 해도 동일한 결과를 만들 수 있지만, 순서를 원하는대로 지정할 수 있도록 itemList를 parameter로 정했습니다.
 * https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
 */
export function itemListToDataOfType<T extends string>(itemList: NameValueItem<T>[]): DataOfType<T> {
  const {typeList, record} = itemList.reduce<Omit<DataOfType<T>, 'itemList'>>((a, {name, value}) => {
    // eslint-disable-next-line no-param-reassign
    a.record[value] = name;
    a.typeList.push(value);

    return a;
  }, {
    typeList: [],
    record: {} as Record<T, string>
  });

  return {
    record,
    itemList,
    typeList
  };
}

type ConvertableValue = number | string | boolean | ((...args: unknown[]) => unknown) | null | undefined;

/**
 * loopRecursively()에 제공된 value값이 만약 객체일 경우, callback으로 그 객체의 키값까지 같이 전달됩니다.
 * 객체안에 객체가 들어있는 경우, 부모 객체와 자식 객체의 key값을 .으로 구분해서 전달됩니다.
 *
 * loopRecursively({key1: 'a', key2: {subKey: 'b'}}) 만약 이렇게 호출한다면,
 * callback으로는 {key: 'key1', value: 'a'}, {key: 'key2.subKey', value: 'b'} 이렇게 전달됩니다.
 */
export type ConvertCallback = (parameter: {key?: string, value: ConvertableValue}) => any;

export interface LoopRecursivelyOption {
  /**
   * 객체가 중첩된 경우, ['key1.key2'] 이런식의 기능도 지원합니다.
   * object, array 둘 다 지원됩니다.
   * 단, key1.key2.[2].key3 이런식으로 특정 index는 지원하지않습니다.
   */
  ignoreKeyList: string[];
}

/**
 * value를 순회 돌면서, Array 또는 중첩된 Object를 계속 재귀 순회하면서 value값만 바꾸는 함수입니다.
 * @param value 임의의 값이 올 수 있지만, object를 권장함
 * @param convertCallback value의 키값마다 저장된 값을 변환할 콜백함수, 변환하지 않을 값이면 callback의 parameter를 그대로 반환해야함.
 * @param option 순회할 때 적용할 옵션
 *
 * @description convertCallback에서 전달되는 key, value로 내가 바꾸려고 하는 값인지를 체크하는 방법은,
 * 1. typeof 연산자를 value에 사용해서 체크할 수도 있고, (하단 trimObject() 확인)
 * 2. key값 / value값을 비교해서 체크할 수도 있습니다.
 */
function loopRecursively(value: object, convertCallback: ConvertCallback, option?: LoopRecursivelyOption): any {
  function recursive(parameter: object | ConvertableValue, parentKey?: string): any {
    if (Array.isArray(parameter)) {
      return parameter.map(item => recursive(item, parentKey));

    } else if (parameter === null || typeof parameter !== 'object') {

      if (parentKey && option && option.ignoreKeyList.includes(parentKey)) {
        return parameter;

      } else {
        return convertCallback({key: parentKey, value: parameter});
      }

    } else {
      return Object.fromEntries(Object.entries(parameter).map(([keyInObject, valueInObject]) => {
        const key = parentKey ? `${parentKey}.${keyInObject}` : keyInObject;
        return [keyInObject, recursive(valueInObject, key)];
      }));
    }
  }

  return recursive(value);
}

/**
 * 기능 설명은 loopRecursively()로 대체합니다.
 *
 * 1. convertCallback은, 전달된 value와 동일한 data type을 반환해야하며
 * 2. 1번으로 인해 이 함수의 반환타입은 전달된 value와 동일한 type임을 보장합니다. (제네릭까지 셋팅)
 */
export function typeSafedLoopRecursivelyObject<O extends object>(object: O, convertCallback: ConvertCallback, option?: LoopRecursivelyOption): O {
  const wrappedCallback: ConvertCallback = (parameter) => {
    const result = convertCallback(parameter);

    if (typeof parameter.value !== typeof result) {
      throw new Error('The converted value types is different than before.');
    }

    return result;
  }

  return loopRecursively(object, wrappedCallback, option);
}

/**
 * 자식의 자식의 자식까지 전부 뒤져서 string이면 trim()함
 * @example ({key1: ' 1 ', key2: [' 2 '], key3: {subKey: ' 3 '}}) ==> {key1: '1', key2: ['2'], key3: {subKey: '3'}}
 */
export function trimObject<O extends object>(value: O, option?: LoopRecursivelyOption): O {
  return typeSafedLoopRecursivelyObject(value, function ({value}) {
    if (typeof value === 'string') {
      return value.trim();
    } else {
      return value;
    }
  }, option);
}

/**
 * API 호출직전 폼 데이터를 정리합니다.
 * 1. 문자열 값은 좌우 공백을 제거하고,
 * 2. null이나 빈문자열인 key는 undefined로 값을 바꿔서 API 호출 시 제외되도록 합니다.
 */
export function cleanFormData(formData: object, option?: LoopRecursivelyOption) {
  return loopRecursively(formData, function ({value}) {
    if (value === null) {
      return undefined;
    }

    if (typeof value === 'string') {
      const trimmedValue = value.trim();

      // trim 했을 때 빈문자열인 케이스도 정리하기위해 굳이 if문을 한번 더 작성하였음
      if (trimmedValue === '') {
        return undefined;

      } else {
        return trimmedValue;
      }
    }

    return value;
  }, option);
}


/*
const test = {
  key1: 1,
  key2: ' 1, 2, 3 ',
  key3: function () {
    console.log('hello world');
  },
  key4: null,
  key5: undefined,
  key6: [1, ' 1 2 3 ', 4],
  key7: {
    key1: 1,
    key2: ' 1, 2, 3 ',
    key3: function () {
      console.log('hello world');
    },
    key4: null,
    key5: undefined,
    key6: [1, ' 1 2 3 ', 4],
  }
};
trimObject(test);
 */

/*************************************************************************************************************
 * Exported interfaces
 *************************************************************************************************************/
export interface NameValueItem<T> {
  name: string;
  value: T;
}

export interface DataOfType<T extends string> {
  typeList: T[];
  itemList: NameValueItem<T>[];
  record: Record<T, string>;
}
