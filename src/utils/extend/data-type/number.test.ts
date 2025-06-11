import {numberWithComma, range} from '@/utils/extend/data-type/number';

describe('numberWithComma()', () => {
  describe('General cases', () => {
    it('4자리 이상이면 원본 문자열 그대로 반환되야한다.', () => {
      expect(numberWithComma('123456')).toBe('123,456');
      expect(numberWithComma(123456)).toBe('123,456');
    });

    it('하지만 소수점은 영향받으면 안된다.', () => {
      expect(numberWithComma('123456.123456')).toBe('123,456.123456');
      expect(numberWithComma(123456.123456)).toBe('123,456.123456');
    });
  });

  describe('Boundary cases', () => {
    it('3자리 이하면 원본 문자열 그대로 반환되야한다.', () => {
      expect(numberWithComma('123')).toBe('123');
      expect(numberWithComma(123)).toBe('123');
    });
  });
});

describe('range()', () => {
  describe('General cases', () => {
    it('should return an array with ascending numbers when from is less than to', () => {
      expect(range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2, 3]);
    });

    it('should return an array with descending numbers when from is greater than to', () => {
      expect(range(3, -3)).toEqual([3, 2, 1, 0, -1, -2, -3]);
    });
  });

  describe('Boundary cases', () => {
    it('should return a single-element array when from and to are equal', () => {
      expect(range(1, 1)).toEqual([1]);
    });
  });
});
