import {FieldPath, FieldValues, RegisterOptions, UseFormReturn} from 'react-hook-form';
import {InputProps} from '@/components/form/Input';

// Doc: https://docs.google.com/document/d/1vfCUikBQ-iRWqJt8-EmIhv2Gvl2hI9zzyAs-XsOpmSo/edit?tab=t.0
export interface FormInputParam<T extends FieldValues> {
  form: {
    methods: UseFormReturn<T>;
    name: FieldPath<T>;
    options?: RegisterOptions<T>;
    props?: InputProps;
  };
  texts?: {
    label?: string;
    placeholder?: string;
    required: string | false;
    // t: UseTranslationReturn << 다국어 번역이 필요한 경우 전달
  };
}
