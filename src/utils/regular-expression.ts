export function doSymbolExist(value: string) {
  return /[^A-Za-z0-9]/gi.test(value);
}

export function doNumberExist(value: string) {
  return /[0-9]/gi.test(value);
}

export function doNotANumberExist(value: string) {
  return /[^0-9]/gi.test(value);
}

export function doAlphabetExist(value: string) {
  return /[A-Za-z]/gi.test(value);
}

export function isRightEmail(value: string) {
  return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(value);
}
