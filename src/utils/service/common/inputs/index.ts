import {FieldErrors, FieldPath, FieldValues, RegisterOptions, UseFormReturn} from 'react-hook-form';
import get from 'lodash/get';

// Doc: https://docs.google.com/document/d/1vfCUikBQ-iRWqJt8-EmIhv2Gvl2hI9zzyAs-XsOpmSo/edit?tab=t.0
export interface FormInputParam<T extends FieldValues> {
  form: {
    methods: UseFormReturn<T>;
    name: FieldPath<T>;
    options?: RegisterOptions<T>;
  };
  texts?: {
    label?: string;
    placeholder?: string;
    required: string | false;
    // t: UseTranslationReturn << 다국어 번역이 필요한 경우 전달
  };
}

export function getMessageFromFieldErrors<T extends FieldValues>(errors: FieldErrors<T>, name: FieldPath<T>): string | undefined {
  const message = get(errors, name)?.message;

  if (typeof message !== 'string') {
    return undefined;
  }

  return message;
}

export function validateRequiredWithTrim(errorMessage: string, required = true) {
  return (value: string) => {
    if (value === '' && !required) {
      return true;
    } else if (value.trim()) {
      return true;
    } else {
      return errorMessage;
    }
  };
}

export function validateMinLengthWithTrim(minLength: number, errorMessage: string) {
  return (value: string) => {
    if (value.trim().length >= minLength) {
      return true;
    } else {
      return errorMessage;
    }
  };
}
