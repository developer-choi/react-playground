import {validateComputableNumber, ValidateQueryOption} from '@/utils/extend/browser/query-string/validate';
import {LegacyValidateError} from '@/utils/service/common/error/class';

describe('validateComputableNumber()', () => {
  const VALID_NUMBER_STRING = '123';
  const VALID_NUMBER = 123;

  describe('General cases', () => {
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
        expect(validateComputableNumber(VALID_NUMBER_STRING, options)).toBe(VALID_NUMBER);
      }
    );
  });

  describe('Edge cases', () => {
    // 해당 케이스는 validateString() 테스트에서 다 진행하기 때문에, validateComputableNumber()에서는 일부만 확인합니다.
    describe('When the underlying validateString fails', () => {
      it('should propagate the result from validateString', () => {
        expect(() => validateComputableNumber(undefined, {required: true, throwable: true})).toThrow(LegacyValidateError);
        expect(validateComputableNumber(undefined, {required: true, throwable: false})).toBeUndefined();
      });
    });

    describe('When the value is not a valid number string format', () => {
      const invalidFormats = [
        {description: 'a string with a plus sign', value: '+123'},
        {description: 'a string with a minus sign', value: '-123'},
        {description: 'a string starting with zero', value: '0123'},
        {description: 'a string containing letters', value: '123a'},
        {description: 'a floating point string', value: '12.34'},
      ];

      it.each(invalidFormats)('should throw a ValidateError when throwable is true for $description', ({value}) => {
        expect(() => validateComputableNumber(value, {throwable: true})).toThrow(LegacyValidateError);
      });

      it.each(invalidFormats)('should return undefined when throwable is false for $description', ({value}) => {
        expect(validateComputableNumber(value, {throwable: false})).toBeUndefined();
      });
    });

    describe('When the value is "0"', () => {
      it('should correctly handle "0" as a valid number', () => {
        expect(validateComputableNumber('0')).toBe(0);
      });
    });

    describe('When the value is a string longer than MAX_SAFE_INTEGER', () => {
      const longString = Number.MAX_SAFE_INTEGER.toString() + '0';

      it('should throw a ValidateError when throwable is true', () => {
        expect(() => validateComputableNumber(longString, {throwable: true})).toThrow(LegacyValidateError);
      });

      it('should return undefined when throwable is false', () => {
        expect(validateComputableNumber(longString, {throwable: false})).toBeUndefined();
      });
    });
  });
});
