export function reverse<K extends string, V extends string>(target: Record<K, V>): Record<V, K> {
  const targetKeys = Object.keys(target) as K[];
  return targetKeys.reduce((a, key) => {
    const value = target[key];
    // eslint-disable-next-line no-param-reassign
    a[value] = key;
    return a;
  }, {} as Record<V, K>);
}
