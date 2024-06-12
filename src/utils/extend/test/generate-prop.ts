export type ArrayProperties<T> = {
  [K in keyof T]: T[K][];
};

export function generateCombinations<T>(obj: ArrayProperties<T>): T[] {
  const keys = Object.keys(obj) as (keyof T)[];
  const result: T[] = [];

  function helper(current: Partial<T>, index: number) {
    if (index === keys.length) {
      result.push(current as T);
      return;
    }

    const key = keys[index];
    const values = obj[key];

    for (let value of values) {
      const newCombination = { ...current, [key]: value };
      helper(newCombination, index + 1);
    }
  }

  helper({}, 0);
  return result;
}

interface TestButtonProp {
  variant: 'outline' | 'fill';
  disabled: boolean;
}

function test() {
  const list = generateCombinations<TestButtonProp>({
    disabled: [true, false],
    variant: ['fill', 'outline']
  });

  /**
   * variant 경우의 수 2가지
   * disabled 경우의 수 2가지
   * 합 2 x 2 = 4가지 케이스의 배열이 응답됨.
   */
  console.log(list);
}
