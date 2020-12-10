export function reverse<K extends string, V extends string>(target: Record<K, V>): Record<V, K> {
  const targetKeys = Object.keys(target) as K[];
  return targetKeys.reduce((a, key) => {
    const value = target[key];
    a[value] = key;
    return a;
  }, {} as Record<V, K>);
}
