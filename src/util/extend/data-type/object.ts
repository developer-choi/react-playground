export function reverse<K extends string, V extends string>(target: Record<K, V>): Record<V, K> {
  const targetKeys = Object.keys(target) as K[];
  return targetKeys.reduce((a, key) => {
    const value = target[key];
    // eslint-disable-next-line no-param-reassign
    a[value] = key;
    return a;
  }, {} as Record<V, K>);
}

export interface NameValueItem<T> {
  name: string;
  value: T;
}

export interface DataOfType<T extends string> {
  typeList: T[];
  itemList: NameValueItem<T>[];
  record: Record<T, string>;
}

/**
 * 정적으로 메뉴에 표시되는 데이터를 바로 보여줄 수 있도록 가공하기 위한 함수입니다.
 * record로도 동일한 결과를 만들 수 있지만, 순서를 원하는대로 지정할 수 있도록 itemList를 parameter로 정했습니다.
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
