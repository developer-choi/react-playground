import {
  validatePeriod,
  ValidateQueryOption
} from '@/utils/extend/browser/query-string/validate';
import {ValidateError} from '@/utils/service/common/error/class';

const DEFAULT_OPTIONS = {
  throwable: false
};

describe('validatePeriod()', () => {
  describe('General cases', () => {
    const start = '2025-06-20';
    const end = '2025-06-28';
    const maxDifference = 10;

    it('should return the start and end dates if the period is valid and within the max difference', () => {
      expect(validatePeriod(start, end, maxDifference, DEFAULT_OPTIONS)).toEqual({start, end});
    });

    const testOptions: {case: string; options?: ValidateQueryOption<any, any>}[] = [
      {case: 'default options', options: undefined},
      {case: 'required: false, throwable: false', options: {required: false, throwable: false}},
      {case: 'required: false, throwable: true', options: {required: false, throwable: true}},
      {case: 'required: true, throwable: false', options: {required: true, throwable: false}},
      {case: 'required: true, throwable: true', options: {required: true, throwable: true}},
    ];

    it.each(testOptions)(
      'should return the parsed number when a valid number string is given, regardless of options ($case)',
      ({options}) => {
        expect(validatePeriod(start, end, maxDifference, options)).toEqual({start, end});
      }
    );
  });

  describe('Boundary cases', () => {
    it('should return the start and end dates when the difference is exactly one less than the max difference', () => {
      const start = '2025-06-20';
      const end = '2025-06-29';
      expect(validatePeriod(start, end, 10, DEFAULT_OPTIONS)).toEqual({start, end});
    });
  });

  describe('Edge cases', () => {
    const maxDifference = 10;

    const invalidCases = [
      // 1. 형식 오류
      {description: 'when a value is undefined', start: undefined, end: '2025-06-25'},
      {description: 'when a value is an array', start: '2025-06-20', end: []},
      {description: 'an invalid start date format', start: '2025-6-20', end: '2025-06-25'},
      {description: 'an invalid end date format', start: '2025-06-20', end: '2025/06/25'},
      {description: 'a non-existent date', start: '2025-02-30', end: '2025-03-05'},

      // 2. 종료일이 시작일보다 과거인 경우
      {description: 'the end date is before the start date', start: '2025-06-25', end: '2025-06-20'},

      // 3. 종료일이 시작일과 같은 경우
      {description: 'the end date is the same as the start date', start: '2025-06-25', end: '2025-06-25'},

      // 4. 기간 차이가 maxDifference 이상인 경우
      {description: 'the period is greater than the max difference', start: '2025-06-20', end: '2025-07-01'},
    ];

    it.each(invalidCases)('should return undefined for $description', ({start, end}) => {
      expect(validatePeriod(start, end, maxDifference, DEFAULT_OPTIONS)).toBeUndefined();
    });

    it('should throw a ValidateError for invalid cases', () => {
      const start = '!@#ASD';
      const end = '!@#ASD';

      expect(() => validatePeriod(start, end, maxDifference, {throwable: true, required: false})).toThrow(ValidateError);
      expect(() => validatePeriod(start, end, maxDifference, {throwable: true, required: true})).toThrow(ValidateError);
    });
  });
});
