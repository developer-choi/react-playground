import ValidateError from '@util/services/handle-error/ValidateError';
import {getFileSizeDetail} from '@util/extend/file/file-size';
import {cleanFileExtension, getFileExtension} from '@util/extend/file/file-extension';

export interface FileRule {
  extensions: string[];
  accept: string;
  validateOption: FileValidateOption;
}

export function getFileRule({limitSize, allowExtensions = [], maxCount}: FileValidateOption): FileRule {
  const extensions = allowExtensions.map(extension => cleanFileExtension(extension));

  return {
    extensions,
    accept: extensions.map((value) => `.${value}`).join(','),
    validateOption: {
      limitSize,
      allowExtensions: extensions,
      maxCount
    }
  };
}

export interface FileValidateOption {
  limitSize?: number;
  allowExtensions?: string[];
  maxCount?: number;
}

/**
 * @exception ValidateError 용량 제한 벗어난 경우
 * @exception ValidateError 확장자 벗어난 경우
 */
export function validateFiles(files: File[], {limitSize, allowExtensions, maxCount}: FileValidateOption) {
  if ((maxCount !== undefined) && files.length > maxCount) {
    throw new ValidateError(`최대 ${maxCount}개의 파일만 가능합니다.`);
  }

  files.forEach(file => {
    const {size, name} = file;

    if ((limitSize !== undefined) && (limitSize < size)) {
      throw new ValidateError(`파일의 용량은 ${getFileSizeDetail(limitSize).text} 를 초과하면 안됩니다.`);
    }

    if(allowExtensions !== undefined) {
      const extension = getFileExtension(name);
      const _allowExtensions = allowExtensions.map(extension => cleanFileExtension(extension));

      if (!extension || !_allowExtensions.includes(extension)) {
        throw new ValidateError(`지원가능한 확장자는 ${_allowExtensions.join(', ')} 입니다.`);
      }
    }
  });
}
