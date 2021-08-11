type SpecialKey = 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey';
const SPECIAL_KEYS: SpecialKey[] = ['shiftKey', 'metaKey', 'ctrlKey', 'altKey'];

/**
 * React.KeyboardEvent와 window.addEventListener에서 전달되는 KeyboardEvent에서 모두 사용해도 타입에러가 안나도록
 * React.KeyboardEvent와 typescript lib에 있는 KeyboardEvent중에 필요한 property만 모았습니다.
 */
export type MinimumKeyboardEvent = Pick<KeyboardEvent, 'key' | SpecialKey>;

/**
 * @param event KeyboardEvent (ex: React.KeyboardEvent or KeyboardEvent (typescript lib)
 * @param matchTarget 사용자가 누른 키와 특수키
 * @example (event, {key: 'A', matchKeys: ['ctrlKey']}) ==> 사용자가 Control Key를 누른 상태로 (= 다른 metaKey, altKey, shiftKey는 누르지않은상태로) 같은 key를 눌러야만 true가 반환됩니다.
 * @example (event, {key: 'Delete'}) ==> 사용자가 어떠한 특수키 (ctrlKey, altKey, metaKey, shiftKey)를 동시에 같이 누르지 않은 상태에서 Delete키 딱 하나만 눌렀을 떄에만 true가 반환됩니다.
 */
export function isMatchKeyboardEvent(event: MinimumKeyboardEvent, matchTarget: { key: string, matchKeys?: SpecialKey[] }) {
  if (event.key.toLowerCase() !== matchTarget.key.toLowerCase()) {
    return false;
  }
  
  const _matchKeys = matchTarget.matchKeys ?? [];
  const restKeys = SPECIAL_KEYS.filter(key => !_matchKeys.includes(key));
  return _matchKeys.every(key => event[key]) && restKeys.every(key => !event[key]);
}
