export function makeUniqueString(prefix = '', suffix = '') {
  return `${prefix}${new Date().getTime().toString()}${suffix}`;
}
