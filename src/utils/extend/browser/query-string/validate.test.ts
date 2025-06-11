import {ValidateQueryOption, validateString} from '@/utils/extend/browser/query-string/validate';
import {ValidateError} from '@/utils/service/error/class';

describe('validateString()', () => {
  describe('General cases', () => {
    it('문자열이면 성공해야한다.', () => {
      const VALUE = 'SOME_STRING';

      expect(validateString(VALUE)).toBe(VALUE);
      expect(validateString(VALUE, {required: false, throwable: false})).toBe(VALUE);
      expect(validateString(VALUE, {required: false, throwable: true})).toBe(VALUE);
      expect(validateString(VALUE, {required: true, throwable: false})).toBe(VALUE);
      expect(validateString(VALUE, {required: true, throwable: true})).toBe(VALUE);
    });
  });

  describe('Edge cases', () => {
    it('없어도 되는데 에러를 던지면 안되는 경우, undefined가 반환되야한다.', () => {
      const options: ValidateQueryOption<false, false> = {
        required: false,
        throwable: false
      };

      expect(validateString('', options)).toBeUndefined();
      expect(validateString([], options)).toBeUndefined();
      expect(validateString(undefined, options)).toBeUndefined();
    });

    it('없어도 되는데 에러를 던져야 하는경우, 에러가 던져져야한다.', () => {
      const options: ValidateQueryOption<false, true> = {
        required: false,
        throwable: true
      };

      expect(() => validateString([], options)).toThrow(ValidateError);

      // required가 false이니, 아래 2개는 에러가 아니어서 undefined가 반환되면됨.
      expect(validateString('', options)).toBeUndefined();
      expect(validateString(undefined, options)).toBeUndefined();
    });

    it('있어야하는데 에러가 던져지면 안되는 경우, undefined가 반환되야한다.', () => {
      const options: ValidateQueryOption<true, false> = {
        required: true,
        throwable: false
      };

      expect(validateString('', options)).toBeUndefined();
      expect(validateString([], options)).toBeUndefined();
      expect(validateString(undefined, options)).toBeUndefined();
    });

    it('있어야하는데 에러가 던져져야 하는 경우, 에러가 던져져야한다.', () => {
      const options: ValidateQueryOption<true, true> = {
        required: true,
        throwable: true
      };

      expect(() => validateString('', options)).toThrow(ValidateError);
      expect(() => validateString([], options)).toThrow(ValidateError);
      expect(() => validateString(undefined, options)).toThrow(ValidateError);
    });
  });
});
