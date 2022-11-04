import ValidateError from '@util/handle-error/ValidateError';
import {useEffect, useState} from 'react';
import type {FileValidateOption} from '@util/extend/file/file-validation';
import {validateFile} from '@util/extend/file/file-validation';
import {handleClientSideError} from '@util/handle-error/client-side-error';

interface UseCreateObjectUrlsParam {
  files: FileList | File[];
  validateOption?: FileValidateOption;
  handleError?: (error: ValidateError) => void;
}

export default function useCreateObjectUrls({files, validateOption, handleError}: UseCreateObjectUrlsParam) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const _files = Array.isArray(files) ? files : Array.from(files);

    try {
      const objectUrls = _files.map(file => {
        if (validateOption) {
          const {limitSize, allowExtensions} = validateOption;
          validateFile(file, {limitSize, allowExtensions});
        }
        
        return URL.createObjectURL(file);
      });
      
      setUrls(objectUrls);

      return () => {
        objectUrls.forEach(url => {
          URL.revokeObjectURL(url);
        });
      };
    } catch (error) {
      if(error instanceof ValidateError) {
        if (!handleError) {
          handleClientSideError(error);
          return;
        }

        handleError(error);
      }
    }
  }, [handleError, files, validateOption]);

  return urls;
}
