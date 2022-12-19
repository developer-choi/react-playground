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
 * @example ({a: 1, b: 'str', c: true}) => {a: 0, b: '', c: false}
 */
export function resetObject<T extends Object>(object: T) {
  return Object.entries(object).reduce((a, [key, value]) => {
    //@ts-ignore
    // eslint-disable-next-line no-param-reassign
    a[key] = RESET_VALUES[typeof value];
    return a;
  }, {} as T);
}

const RESET_VALUES: Record<string, any> = {
  string: '',
  number: 0,
  boolean: false,
  object: {},
  function: () => {
  },
  undefined: undefined,
  bigint: BigInt(0),
  symbol: Symbol()
};
