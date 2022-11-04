import ValidateError from '@util/handle-error/ValidateError';
import {getFileSizeDetail} from '@util/extend/file/file-size';
import {cleanFileExtension, getFileExtension} from '@util/extend/file/file-extension';

export interface FileRule {
  extensions: string[];
  accept: string;
  limitSize: number;
  validateOption: FileValidateOption;
}

export function getFileRule({limitSize, extensions}: Pick<FileRule, 'extensions' | 'limitSize'>): FileRule {
  const _extensions = extensions.map(extension => cleanFileExtension(extension));

  return {
    extensions: _extensions,
    limitSize,
    accept: _extensions.map((value) => `.${value}`).join(','),
    validateOption: {
      limitSize,
      allowExtensions: _extensions
    }
  };
}

export interface FileValidateOption {
  allowExtensions: string[];
  limitSize: number;
}

/**
 * @exception ValidateError 용량 제한 벗어난 경우
 * @exception ValidateError 확장자 벗어난 경우
 */
export function validateFile(file: File, {limitSize, allowExtensions}: FileValidateOption) {
  const {size, name} = file;

  if (limitSize < size) {
    throw new ValidateError(`파일의 용량은 ${getFileSizeDetail(limitSize).text} 를 초과하면 안됩니다.`);
  }

  const extension = getFileExtension(name);
  const _allowExtensions = allowExtensions.map(extension => cleanFileExtension(extension));
  if (!extension || !_allowExtensions.includes(extension)) {
    throw new ValidateError(`지원가능한 확장자는 ${_allowExtensions.join(', ')} 입니다.`);
  }
}
