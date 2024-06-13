type Arrayify<T> = {
  [K in keyof T]: T[K][];
};

type FilterRecord<T> = {
  [K in keyof T]: T[K] extends boolean ? { name: string; value: T[K] }[] : { name: string; value: T[K] | undefined }[];
};

export function generateCombinations<T>(obj: Partial<Arrayify<T>>): { filterRecord: FilterRecord<T>; combinations: T[] } {
  const keys = Object.keys(obj) as (keyof T)[];
  const result: T[] = [];

  function helper(current: Partial<T>, index: number) {
    if (index === keys.length) {
      result.push(current as T);
      return;
    }

    const key = keys[index];
    const values = obj[key]!;

    for (let value of values) {
      const newCombination = { ...current, [key]: value };
      helper(newCombination, index + 1);
    }
  }

  helper({}, 0);

  const filterRecord = {} as FilterRecord<T>;

  keys.forEach((key) => {
    const values = obj[key]!;
    if (typeof values[0] === 'boolean') {
      filterRecord[key] = values.map((value) => ({
        name: `${String(key)} ${String(value)}`,
        value,
      })) as FilterRecord<T>[typeof key];
    } else {
      filterRecord[key] = [
        { name: 'unset', value: undefined },
        ...values.map((value) => ({ name: value as string, value })),
      ] as FilterRecord<T>[typeof key];
    }
  });

  return { filterRecord, combinations: result };
}

interface TestButtonProp {
  variant: 'outline' | 'fill';
  disabled: boolean;
}

function test() {
  const {combinations} = generateCombinations<TestButtonProp>({
    disabled: [true, false],
    variant: ['fill', 'outline']
  });

  /**
   * variant 경우의 수 2가지
   * disabled 경우의 수 2가지
   * 합 2 x 2 = 4가지 케이스의 배열이 응답됨.
   */
  console.log(combinations);
}
