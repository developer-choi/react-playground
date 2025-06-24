import {randomRotatedNumberArray} from '@/utils/extend/random/generate-dummy';

const TEST_LENGTH = [[3], [4], [5], [6], [7]];

const SORT_CASES = [
  {
    sort: 'asc' as const,
    breakCondition: (a: number, b: number) => a > b,
  },
  {
    sort: 'desc' as const,
    breakCondition: (a: number, b: number) => a < b,
  },
];

describe('randomRotatedNumberArray()', () => {
  describe.each(SORT_CASES)('with $sort order', ({sort, breakCondition}) => {
    describe('General cases', () => {
      it.each(TEST_LENGTH)(
        'should return a correctly rotated array for length %s',
        (length) => {
          const result = randomRotatedNumberArray(length, sort);

          // 1. 결과 배열의 길이는 입력된 length와 같아야 합니다.
          expect(result).toHaveLength(length);

          // 2. 결과 배열의 요소들은 1부터 length까지의 숫자를 모두 포함해야 합니다.
          const originalSorted = Array.from({length}, (_, i) => i + 1);
          expect([...result].sort((a, b) => a - b)).toEqual(originalSorted);

          // 3. 이 배열이 정말로 회전인지 체크합니다. > 순서가 깨지는 지점(break point)은 단 한 번만 존재해야 합니다.
          let breakCount = 0;
          for (let i = 0; i < result.length - 1; i++) {
            if (breakCondition(result[i], result[i + 1])) {
              breakCount++;
            }
          }
          expect(breakCount).toBe(1);
        },
      );
    });
  });

  describe('Edge cases', () => {
    it('should throw a TypeError if length is 2 or less', () => {
      expect(() => randomRotatedNumberArray(2)).toThrow(TypeError);
      expect(() => randomRotatedNumberArray(1)).toThrow(TypeError);
      expect(() => randomRotatedNumberArray(0)).toThrow(TypeError);
    });
  });
});
