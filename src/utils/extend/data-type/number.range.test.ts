import {range} from '@/utils/extend/data-type/number';

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
