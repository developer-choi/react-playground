import {numberWithComma, range} from '@/utils/extend/data-type/number';

describe('numberWithComma()', () => {
  const positiveCases = [
    {input: 1, expected: '1'},
    {input: 12, expected: '12'},
    {input: 123, expected: '123'},
    {input: 1234, expected: '1,234'},
    {input: 12345, expected: '12,345'},
    {input: 123456, expected: '123,456'},
    {input: 1234567, expected: '1,234,567'},
    {input: 1234567.12345, expected: '1,234,567.12345'},
  ];

  const negativeCases = positiveCases.map(({input, expected}) => ({
    input: -input,
    expected: `-${expected}`
  }));

  describe('General cases', () => {
    describe('Positive numbers', () => {
      it.each(positiveCases)('should format the number $input to "$expected"', ({input, expected}) => {
        expect(numberWithComma(input)).toBe(expected);
        expect(numberWithComma(input.toString())).toBe(expected);
      });
    });

    describe('Negative numbers', () => {
      it.each(negativeCases)('should correctly format the negative number $input to "$expected"', ({input, expected}) => {
        expect(numberWithComma(input)).toBe(expected);
        expect(numberWithComma(input.toString())).toBe(expected);
      });
    });

    describe('when handling numbers with decimal points', () => {
      it('should not affect the decimal part', () => {
        const decimalValue = 123456.123456;
        const expectedString = '123,456.123456';

        expect(numberWithComma(decimalValue)).toBe(expectedString);
        expect(numberWithComma(decimalValue.toString())).toBe(expectedString);
      });
    });
  });

  describe('Boundary cases', () => {
    it('should return "0" when the input is 0', () => {
      expect(numberWithComma(0)).toBe('0');
      expect(numberWithComma('0')).toBe('0');
    });
  });

  describe('Edge cases', () => {
    it('should handle decimals without an integer part', () => {
      expect(numberWithComma('.123')).toBe('.123');
    });

    it('should handle integers with a trailing decimal point', () => {
      expect(numberWithComma('123.')).toBe('123.');
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
