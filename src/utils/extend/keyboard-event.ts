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
 */
export function isMatchKeyboardEvent(event: MinimumKeyboardEvent, matchTarget: { key: string, matchKeys: SpecialKey[] }) {
  if (event.key.toLowerCase() !== matchTarget.key.toLowerCase()) {
    return false;
  }
  
  const restKeys = SPECIAL_KEYS.filter(key => !matchTarget.matchKeys.includes(key));
  return matchTarget.matchKeys.every(key => event[key]) && restKeys.every(key => !event[key]);
}
