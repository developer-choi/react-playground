import {useCallback} from 'react';
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import {
  CoreImagePreviewParameter,
  FileAndThumbnail,
  SingleFileAndThumbnail,
  useCoreImageFile,
  useCoreSingleImageFile
} from '@/utils/extend/file/handle-image/core';

export interface RHFSingleImageFileParameter<T extends FieldValues> extends Pick<CoreImagePreviewParameter, 'options'> {
  methods: {
    setValue: UseFormSetValue<T>;
    watch: UseFormWatch<T>;
    register: UseFormRegister<T>;
  };
  names: {
    item: FieldPath<T>;
    validator: FieldPath<T>; // required 체크용 HiddenInput에 전달될 input props
  };
  /**
   * string > 대부분 required 에러메시지 노출 용도로 사용
   * object > register 2nd parameter에 전달되는 유효성검증 옵션
   * undefined > 그 파일폼이 optional일 때
   */
  isValidOptions?: string | RegisterOptions<T>;
  setItem?: (singleFile: Partial<SingleFileAndThumbnail>) => void // 완전 커스텀하고싶으면 전달
}

// TODO 여기 options 해놓고 안쓴이유 추후 분석하기...
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useRHFSingleImageFile<T extends FieldValues>({options, isValidOptions, methods, names, ...rest}: RHFSingleImageFileParameter<T>) {
  const setItem = useCallback((item: Partial<SingleFileAndThumbnail>) => {
    methods.setValue(names.item, item as PathValue<T, Path<T>>);
    methods.setValue(names.validator, true as PathValue<T, Path<T>>, {
      shouldValidate: true
    });
  }, [methods, names.item, names.validator]);

  const {clearItem, inputFileProps, file, image} = useCoreSingleImageFile({
    item: methods.watch(names.item) ?? {
      file: undefined,
      image: undefined
    },
    setItem,
    ...rest,
  });

  return {
    item: {
      file,
      image
    },
    clearItem,
    inputProps: {
      file: inputFileProps,
      isValid: methods.register(names.validator, typeof isValidOptions === 'string' ? {required: isValidOptions} : isValidOptions),
    }
  }
}

export interface RHFMultipleImageFileParameter<T extends FieldValues> extends Pick<CoreImagePreviewParameter, 'options'>, Pick<RHFSingleImageFileParameter<T>, 'isValidOptions' | 'methods'> {
  names: {
    list: FieldPath<T>;
    validator: FieldPath<T>; // required 체크용 HiddenInput에 전달될 input props
  };
  setList?: (list: FileAndThumbnail[]) => void // 완전 커스텀하고싶으면 전달
}

export function useRHFMultipleImageFile<T extends FieldValues>({names, isValidOptions, methods, ...rest}: RHFMultipleImageFileParameter<T>) {
  const setList = useCallback((list: FileAndThumbnail[]) => {
    methods.setValue(names.list, list as PathValue<T, Path<T>>);
    methods.setValue(names.validator, true as PathValue<T, Path<T>>, {
      shouldValidate: true
    });
  }, [methods, names.list, names.validator]);

  const {removeItem, inputFileProps, list} = useCoreImageFile({
    list: methods.watch(names.list) ?? [],
    setList,
    multiple: true,
    ...rest,
  });

  return {
    list,
    removeItem,
    inputProps: {
      file: inputFileProps,
      isValid: methods.register(names.validator, typeof isValidOptions === 'string' ? {required: isValidOptions} : isValidOptions),
    }
  }
}
