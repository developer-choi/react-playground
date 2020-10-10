export type CharacterType = 'Lower';

function isLower(value: string | number): boolean {
  return true;
}
export type IsType = (value: string | number) => boolean

const IsObject: Record<CharacterType, IsType> = {
  Lower: isLower,
};

function shouldBeIs(value: string | number, list: CharacterType[]): boolean {
  return list.map(allow => IsObject[allow]).some(callback => callback(value));
}

function onChangeHandler(value: string) {

  const shouldBeAllow = shouldBeIs('123', ['Lower']);

  if (shouldBeAllow) {
    //  onChangeText, onChangeNumber call

  } else {
    //  onChangeText, onChangeNumber not call
  }
}

