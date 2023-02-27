/**
 * Returns truncated characters until they are found, such as parseInt().
 * If the first character is not allowed, an empty string is returned.
 *
 * @example ('123abc', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) => '123'
 */
export function parseString(text: string, allowCharacters: string[]) {
  let _text = '';

  for (const char of text) {
    if (!allowCharacters.includes(char)) {
      break;
    }

    _text += char;
  }

  return _text;
}

export function count(text: string, target: string) {
  const regex = new RegExp(target, 'g');
  return (text.match(regex) || []).length;
}

export function booleanToString(value: boolean, prefix = '') {
  const stringValue = value ? 'true' : 'false';
  return prefix + ` ${stringValue}`;
}

interface ReplaceMultipleParam {
  original: string;
  replaceRecord: Record<string, string | number>;
  keyCallback: (key: string) => string;
}

export function replaceMultiple({replaceRecord, original, keyCallback}: ReplaceMultipleParam) {
  return Object.entries(replaceRecord).reduce((a, [key, value]) => {
    return a.replace(keyCallback ? keyCallback(key) : key, value.toString());
  }, original);
}
