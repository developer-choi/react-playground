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

/**
 * Function with added functionality in parseString(), which can limit the number of characters allowed.
 */
export function parseStringLimitCount<K extends string>(text: string, allowCharacters: string[], limitCountRecord: Record<K , number>) {
  let _text = '';
  
  const limitCharacters = Object.keys(limitCountRecord) as K[];
  
  const record = limitCharacters.reduce((a, b) => {
    a[b] = 0;
    return a;
  }, {} as Record<K , number>);
  
  for (const char of text) {
    if (!allowCharacters.includes(char) && !limitCharacters.includes(char as any)) {
      break;
    }
  
    if (limitCharacters.includes(char as any)) {
      const _char = char as K;
      
      record[_char]++;
  
      if (record[_char] > limitCountRecord[_char]) {
        break;
      }
    }
    
    _text += char;
  }
  
  return _text;
}
