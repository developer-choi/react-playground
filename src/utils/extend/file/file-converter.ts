import {FileValidateOption, validateFiles} from '@/utils/extend/file/file-validation';
import {useCallback, useEffect, useState} from 'react';
import {handleClientSideError, ValidateError} from '@/utils/extend/file/common';
import {InputFileProps} from '@/components/form/InputFile';
import { v4 as uuidv4 } from 'uuid';

// https://docs.google.com/document/d/1_9-Bw4SihS6DGpskF8Xor_gaahHetDfKDk6QJeZQ6Ig/edit?tab=t.0
export interface SingleFileImagePreviewParameter {
  extensions?: string[]; // 기본값은 이미지 전체 가능, 따로 지정할 경우 dot을 포함해야함. (ex: ['.jpg']), 이걸로 input type file의 accept도 만듬.
  validateOption?: Pick<FileValidateOption, 'limitSize'>; // 파일 유효성검증할 때 사용
  initialImageUrl?: string; // 이미지 안바꾸고 제출하면 기존이미지 URL만 있고 파일은 없는 상태가됨.
}

// 프로필이미지 변경폼 처럼 단일 이미지 미리보기만 필요한 경우에 씀
export function useSingleFileImagePreview({initialImageUrl, extensions, validateOption}: SingleFileImagePreviewParameter) {
  const [item, setItem] = useState<{preview: Pick<HTMLImageElement, 'src' | 'alt'> | undefined, file: File | undefined}>({
    preview: !initialImageUrl ? undefined : {
      src: initialImageUrl,
      alt: 'preview image'
    },
    file: undefined
  });

  useEffect(() => {
    if (item && item.preview && item.preview.src !== initialImageUrl) {
      URL.revokeObjectURL(item.preview.src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFiles = useCallback(async (files: File[]) => {
    const newFile = files[0];

    try {
      if (validateOption) {
        // 단일 이미지로 쓸 때는 항상 교체하도록
        validateFiles(files, validateOption);
      }

      const newItem = await validateImageIsReal(newFile);

      setItem(prevState => {
        if (prevState.file && prevState.preview) {
          URL.revokeObjectURL(prevState.preview.src);
        }

        return {
          file: newFile,
          preview: newItem.image
        };
      });
    } catch (error) {
      handleClientSideError(error);
    }
  }, [validateOption]);

  const removeItem = useCallback(() => {
    setItem({
      preview: undefined,
      file: undefined
    });
  }, []);

  const validatedExtensions = getValidatedExtensions(extensions);

  const inputFileProps: Pick<InputFileProps, 'accept' | 'onChangeFiles' | 'multiple'> = {
    accept: !validatedExtensions.length ? 'image/*' : validatedExtensions.join(','),
    onChangeFiles,
  };

  return {
    preview: item?.preview,
    file: item?.file,
    removeItem,
    inputFileProps
  };
}

export interface MultipleFileImagePreviewParameter extends Pick<SingleFileImagePreviewParameter, 'extensions'> {
  validateOption?: Omit<FileValidateOption, 'allowExtensions'>; // 파일 유효성검증할 때 사용
}

/** Return
 * <input type="file"에 전달할 각종 props 생성 후 반환
 *  - accept 기본값 지정 (안하면 image/*)
 *
 * 이미지를 등록하면 미리보기 이미지 배열 반환
 * (POST, PATCH API 호출하기 위한) 원본 파일도 반환
 */
export function useMultipleFileImagePreview({extensions, validateOption}: MultipleFileImagePreviewParameter) {
  const [list, setList] = useState<ExtendedImageFile[]>([]);

  // const handleClientSideError = useHandleClientSideError();

  /** revokeObjectUrl 시점 정리
   * 1. unmount
   * 2. keepPrevData false + 이미지 새로 등록
   * 3. 이미지 확장자로만 바꾼 이상한 파일 검증하다 실패했을 때
   * 4. 유저가 이미지 미리보기에서 특정항목 삭제했을 때
   */
  useEffect(() => {
    return () => {
      list.forEach(file => {
        URL.revokeObjectURL(file.image.src);
      });
    };
  }, [list]);

  const onChangeFiles = useCallback(async (files: File[]) => {
    try {
      if (validateOption) {
        // 단일 이미지로 쓸 때는 항상 교체하도록
        validateFiles(files, validateOption, list.map(({file}) => file));
      }

      const newList = await Promise.all(files.map(file => validateImageIsReal(file)));

      setList(prevState => {
        if (KEEP_PREV_DATA) {
          return prevState.concat(newList);

        } else {
          prevState.forEach(file => {
            URL.revokeObjectURL(file.image.src);
          });
          return newList;
        }
      });
    } catch (error) {
      handleClientSideError(error);
    }
  }, [list, validateOption]);

  const removeItem = useCallback((item: ExtendedImageFile) => {
    setList(prevState => {
      URL.revokeObjectURL(item.image.src);
      return prevState.filter(({id}) => id !== item.id);
    });
  }, []);

  const validatedExtensions = getValidatedExtensions(extensions);

  const inputFileProps: Pick<InputFileProps, 'accept' | 'onChangeFiles' | 'multiple'> = {
    accept: !validatedExtensions.length ? 'image/*' : validatedExtensions.join(','),
    onChangeFiles,
    multiple: true
  };

  return {
    list,
    removeItem,
    inputFileProps
  };
}

export interface ExtendedImageFile {
  file: File;
  image: Pick<HTMLImageElement, 'src' | 'alt'>;
  id: string;
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
function getValidatedExtensions(extensions?: string[]) {
  if (extensions?.some(extension => !extension.startsWith('.'))) {
    console.error('확장자 명은 . (dot) 으로 시작해야합니다.');
    return [];
  } else {
    return extensions ?? [];
  }
}

/**
 * 파일 확장자만 이미지 확장자로 바꿔서 입력을 시도한 경우,
 * 여기서 걸러질 수 있음.
 */
async function validateImageIsReal(file: File): Promise<ExtendedImageFile> {
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.alt = 'preview image';

  return new Promise((resolve, reject) => {
    image.onload = function () {
      resolve({
        file,
        image: {
          src: image.src,
          alt: image.alt,
        },
        id: uuidv4()
      });
    };

    image.onerror = function () {
      console.error('This src cannot be converted to an image.', file);
      URL.revokeObjectURL(image.src);
      reject(new ValidateError('Unable to convert to image. Please select another file.'));
    };
  });
}

/**
 * 이미지를 등록하고나서 추가로 다시 등록할 때 기존 이미지를 유지할지 여부
 * 근데 이미지 여러개 등록하는 케이스에서는 수많은 웹사이트가 다 기존 이미지 초기화 안하길래
 * 정적변수로 일단 분리했음.
 */
const KEEP_PREV_DATA = true;
