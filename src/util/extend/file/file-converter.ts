import ValidateError from '@util/services/handle-error/ValidateError';
import {useCallback, useEffect, useState} from 'react';
import type {FileValidateOption} from '@util/extend/file/file-validation';
import {validateFiles} from '@util/extend/file/file-validation';
import {useHandleClientSideError} from "@util/services/handle-error/client-side-error";

interface UseCreateObjectUrlsParam {
  keepPrevData?: boolean;
  validateOption?: FileValidateOption;
  handleError?: (error: ValidateError) => void;
}

/** Limitations
 * 파일을 추가할경우 (keepPrevData 여부 상관없이), 기존에 만들었던 모든 이미지의 objectUrl을 다 지우고 새로 만든다.
 *
 * 1. 기존 파일을 유지하면서 새 파일을 append해야하는 상황이었고,
 * 2. ObjectUrl을 만들면 안쓰일 때 release를 해야했지만,
 * 3. 이 hooks가 마운트 된 컴포넌트가 언마운트될 때 기준 최신 이미지들 값을 가져올 수가 없었다.
 * 4. 그래서 결국 이미지가 바뀔 때마다 위의 한계가 발생했다.
 */
export default function useFilesToImages({keepPrevData = false, validateOption, handleError}: UseCreateObjectUrlsParam) {
  const [data, setData] = useState<{files: File[], images: HTMLImageElement[]}>({
    files: [],
    images: []
  });

  const handleClientSideError = useHandleClientSideError();

  useEffect(() => {
    return () => {
      data.images.forEach(image => {
        URL.revokeObjectURL(image.src);
      });
    };
  }, [data.images]);

  const onChangeFiles = useCallback(async (files: File[]) => {
    try {
      const allFiles = !keepPrevData ? files : files.concat(data.files);

      if (validateOption) {
        validateFiles(allFiles, validateOption);
      }

      const allImages = await Promise.all(allFiles.map(file => srcToImageElement(URL.createObjectURL(file))));

      setData({
        files: allFiles,
        images: allImages
      });

    } catch (error) {
      if (!handleError || !(error instanceof ValidateError)) {
        handleClientSideError(error);
        return;
      }

      handleError(error);
    }
  }, [keepPrevData, data.files, validateOption, handleError, handleClientSideError]);

  const onChangeFile = useCallback(async (file: File | undefined) => {
    if (!file) {
      return;
    }

    return onChangeFiles([file]);
  }, [onChangeFiles]);

  return {
    files: data.files,
    images: data.images,
    onChangeFile,
    onChangeFiles
  };
}

/**
 * @param src: Internal Image or External Image or Data Uri
 */
async function srcToImageElement(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = src;

  return new Promise((resolve, reject) => {
    image.onload = function () {
      resolve(image);
    };

    image.onerror = function (...params) {
      console.error('This src cannot be converted to an image.', src, params);
      reject(new ValidateError('Unable to convert to image. Please select another file.'));
    };
  });
}
