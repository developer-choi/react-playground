// 특히 시간 표시할 때 엄청 많이 씀.
export function padToTwoDigits(value: string | number) {
  return (typeof value === 'number' ? value.toString() : value).padStart(2, '0');
}

// sortByNumber와 활용해서 많이나온 키워드로 정렬해서 보여줄 수 있음.
export function classifyStrings(array: string[]): {value: string, count: number}[] {
  return Object.entries(array.reduce((a, b) => {
    if (a[b]) {
      a[b]++;
      return a;
    } else {
      a[b] = 1;
      return a;
    }
  }, {} as Record<string, number>)).map(([key, value]) => ({
    value: key,
    count: value
  }));
}
