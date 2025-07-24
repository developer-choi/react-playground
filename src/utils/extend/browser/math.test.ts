import {combination, factorial, permutation} from '@/utils/extend/browser/math';

// yarn test src/utils/extend/browser/math.test.ts
describe('factorial()', () => {
  describe('should handle general cases', () => {
    it('should calculate factorial correctly for positive integers', () => {
      expect(factorial(2)).toBe(2);
      expect(factorial(3)).toBe(6);
      expect(factorial(4)).toBe(24);
      expect(factorial(5)).toBe(120);
    });
  });

  describe('should handle boundary cases', () => {
    it('should return 1 for factorial of 1', () => {
      expect(factorial(1)).toBe(1);
    });
    it('should return 1 for factorial of 0', () => {
      expect(factorial(0)).toBe(1);
    });
  });

  describe('should handle edge cases', () => {
    it('should throw TypeError for negative numbers', () => {
      expect(() => factorial(-1)).toThrow(TypeError);
    });
  });
});

describe('permutation()', () => {
  it('should calculate permutation correctly', () => {
    expect(permutation(3, 1)).toBe(3);
    expect(permutation(3, 2)).toBe(6);
    expect(permutation(4, 2)).toBe(12);
  });
});


describe('combination()', () => {
  it('should calculate combination correctly', () => {
    expect(combination(3, 1)).toBe(3);
    expect(combination(3, 2)).toBe(3);
    expect(combination(4, 2)).toBe(6);
  });
});
