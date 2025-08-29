import {ValidateQueryOption, validateIncludeString} from '@/utils/extend/browser/query-string/validate';
import {LegacyValidateError} from '@/utils/service/common/error/class';

const ALLOW_LIST = ['ascending', 'descending'];
const VALID_VALUE = 'ascending';
const INVALID_VALUE = 'Lorem Ipsum';

describe('validateIncludeString()', () => {
  describe('General cases', () => {
    const testOptions: {case: string; options?: ValidateQueryOption<any, any>}[] = [
      {case: 'default options', options: undefined},
      {case: 'required: false, throwable: false', options: {required: false, throwable: false}},
      {case: 'required: false, throwable: true', options: {required: false, throwable: true}},
      {case: 'required: true, throwable: false', options: {required: true, throwable: false}},
      {case: 'required: true, throwable: true', options: {required: true, throwable: true}},
    ];

    it.each(testOptions)(
      'should return the value itself when the value is in the allow-list, regardless of options ($case)',
      ({options}) => {
        expect(validateIncludeString(VALID_VALUE, [...ALLOW_LIST], options)).toBe(VALID_VALUE);
      }
    );
  });

  describe('Edge cases', () => {
    // 해당 케이스는 validateString() 테스트에서 다 진행하기 때문에, validateIncludeString()에서는 일부만 확인합니다.
    describe('When the underlying validateString fails', () => {
      it('should propagate the result from validateString', () => {
        expect(() => validateIncludeString(undefined, [...ALLOW_LIST], {required: true, throwable: true})).toThrow(LegacyValidateError);
        expect(validateIncludeString(undefined, [...ALLOW_LIST], {required: true, throwable: false})).toBeUndefined();
      });
    });

    describe('When the queryValue is a valid string but not in the allow-list', () => {
      it('should throw a ValidateError when throwable is true', () => {
        expect(() => validateIncludeString(INVALID_VALUE, [...ALLOW_LIST], {throwable: true})).toThrow(LegacyValidateError);
      });

      it('should return undefined when throwable is false', () => {
        expect(validateIncludeString(INVALID_VALUE, [...ALLOW_LIST], {throwable: false})).toBeUndefined();
      });
    });

    describe('When the allow-list itself is empty', () => {
      it('should throw a ValidateError when throwable is true', () => {
        expect(() => validateIncludeString(VALID_VALUE, [], {throwable: true})).toThrow(LegacyValidateError);
      });

      it('should return undefined when throwable is false', () => {
        expect(validateIncludeString(VALID_VALUE, [], {throwable: false})).toBeUndefined();
      });
    });
  });
});
