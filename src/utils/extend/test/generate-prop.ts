type Arrayify<T> = {
  [K in keyof T]: (T[K] | 'all')[] | 'boolean';
};

type FilterRecord<T> = {
  [K in keyof T]: T[K] extends boolean
    ? {
      type: 'checkbox';
      name: string;
      value: undefined;
    }[]
    : {
      type: 'radio';
      name: string;
      value: 'all' | T[K] | undefined;
    }[];
};

export function generatePropsList<T>(obj: Partial<Arrayify<T>>): {
  filterRecord: FilterRecord<T>;
  combinations: T[];
} {
  const keys = Object.keys(obj) as (keyof T)[];
  const result: T[] = [];

  function helper(current: Partial<T>, index: number) {
    if (index === keys.length) {
      result.push(current as T);
      return;
    }

    const key = keys[index];
    const values = obj[key]!;

    if (values === 'boolean') {
      for (const value of [false, true]) {
        const newCombination = { ...current, [key]: value };
        helper(newCombination, index + 1);
      }
    } else {
      for (const value of values.filter((value) => value !== 'all')) {
        const newCombination = { ...current, [key]: value };
        helper(newCombination, index + 1);
      }
    }
  }

  helper({}, 0);

  const filterRecord = {} as FilterRecord<T>;

  keys.forEach((key) => {
    const values = obj[key]!;
    if (values === 'boolean') {
      filterRecord[key] = [
        { type: 'checkbox', name: `${String(key)}`, value: undefined },
      ] as FilterRecord<T>[typeof key];
    } else {
      filterRecord[key] = values.map((value) => ({
        type: 'radio',
        name: value === '' ? 'empty' : value === undefined ? 'default' : value,
        value: value === undefined ? '' : value,
      })) as FilterRecord<T>[typeof key];
    }
  });

  return { filterRecord, combinations: result };
}

export function filterPropsList<T extends object>(array: T[], filter: Record<keyof T, any>) {
  return array.filter((data) => {
    return Object.entries(filter).every(([key, valueInFilter]) => {
      if (!(key in data) || valueInFilter === 'all') {
        return true;
      }

      const valueInData = data[key as keyof T];

      if ((valueInData === undefined || valueInData === '') && (valueInFilter === undefined || valueInFilter === '')) {
        return true;
      }

      return valueInData === valueInFilter;
    });
  });
}
