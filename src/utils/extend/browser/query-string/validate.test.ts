import {ValidateQueryOption, validateString} from '@/utils/extend/browser/query-string/validate';
import {ValidateError} from '@/utils/service/error/class';

describe('validateString()', () => {
  describe('General cases', () => {
    const VALID_STRING = 'SOME_STRING';

    const testOptions: {case: string; options?: ValidateQueryOption<any, any>}[] = [
      {case: 'default options', options: undefined},
      {case: 'required: false, throwable: false', options: {required: false, throwable: false}},
      {case: 'required: false, throwable: true', options: {required: false, throwable: true}},
      {case: 'required: true, throwable: false', options: {required: true, throwable: false}},
      {case: 'required: true, throwable: true', options: {required: true, throwable: true}},
    ];

    it.each(testOptions)(
      'should return the string itself, regardless of options ($case), when a valid string is given',
      ({options}) => {
        expect(validateString(VALID_STRING, options)).toBe(VALID_STRING);
      }
    );
  });

  describe('Edge cases', () => {
    describe('When { required: false, throwable: false }', () => {
      const options: ValidateQueryOption<false, false> = {
        required: false,
        throwable: false
      };

      const invalidValues = [
        {description: 'an empty string', value: ''},
        {description: 'an array', value: []},
        {description: 'undefined', value: undefined},
      ];

      it.each(invalidValues)('should return undefined when the value is $description', ({value}) => {
        expect(validateString(value, options)).toBeUndefined();
      });
    });

    describe('When { required: false, throwable: true }', () => {
      const options: ValidateQueryOption<false, true> = {
        required: false,
        throwable: true,
      };

      it('should throw a ValidateError when an array is provided', () => {
        expect(() => validateString([], options)).toThrow(ValidateError);
      });

      const nonErrorValues = [
        {description: 'an empty string', value: ''},
        {description: 'undefined', value: undefined},
      ];

      it.each(nonErrorValues)('should return undefined without an error when the value is $description', ({value}) => {
        expect(validateString(value, options)).toBeUndefined();
      });
    });

    describe('When { required: true, throwable: false }', () => {
      const options: ValidateQueryOption<true, false> = {
        required: true,
        throwable: false
      };

      const invalidValues = [
        {description: 'an empty string', value: ''},
        {description: 'an array', value: []},
        {description: 'undefined', value: undefined},
      ];

      it.each(invalidValues)('should return undefined without an error when the value is $description', ({value}) => {
        expect(validateString(value, options)).toBeUndefined();
      });
    });

    describe('When { required: true, throwable: true } (Default)', () => {
      const options: ValidateQueryOption<true, true> = {
        required: true,
        throwable: true
      };

      const invalidValues = [
        {description: 'an empty string', value: ''},
        {description: 'an array', value: []},
        {description: 'undefined', value: undefined},
      ];

      it.each(invalidValues)('should throw a ValidateError when the value is $description', ({value}) => {
        expect(() => validateString(value, options)).toThrow(ValidateError);
      });
    });
  });
});