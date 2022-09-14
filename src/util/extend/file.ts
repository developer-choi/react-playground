import type {FileConvertOption} from '@util/extend/image';
import ValidateError from '@util/handle-error/ValidateError';

export interface FileRule {
  extensions: string[];
  accept: string;
  limitSize: number;
  convertOption: FileConvertOption;
}

export function getFileRule({limitSize, extensions}: Pick<FileRule, 'extensions' | 'limitSize'>): FileRule {
  const _extensions = extensions.map(extension => cleanFileExtension(extension));

  return {
    extensions: _extensions,
    limitSize,
    accept: _extensions.map((value) => `.${value}`).join(','),
    convertOption: {
      validate: {
        limitSize,
        allowExtensions: _extensions
      }
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

export type FileUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

export interface FileSize {
  size: number;
  unit: FileUnit;
}

export interface FileSizeDetail extends FileSize {
  original: number;
  text: string;
}

export function fileSizeToByte(size: number, unit: FileUnit): number {
  switch (unit) {
    case 'B':
      return size;

    case 'KB':
      return size * 2 ** 10;

    case 'MB':
      return size * 2 ** 20;

    case 'GB':
      return size * 2 ** 30;

    default:
      throw new ValidateError('허용되지 않는 파일의 용량단위입니다.');
  }
}

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string#answer-28120564
export function getFileSizeDetail(byte: number): FileSizeDetail {
  const original = byte;

  if (byte == 0) {
    return {
      size: 0,
      unit: 'B',
      text: '0B',
      original
    };
  }

  const e = Math.floor(Math.log(byte) / Math.log(1024));
  const size = Number((byte / Math.pow(1024, e)).toFixed(2));
  const unit = ' KMG'.charAt(e) + 'B' as FileUnit;
  const text = size + unit;

  return {
    size,
    unit,
    original,
    text
  };
}

export function getFileExtension(filename: string): string | undefined {
  if (filename.includes('.')) {
    const lastIndex = filename.lastIndexOf('.') + 1;
    return cleanFileExtension(filename.slice(lastIndex));
  } else {
    return undefined;
  }
}

function cleanFileExtension(extension: string) {
  let value = extension;

  if (extension.startsWith('.')) {
    value = value.slice(0);
  }

  return value.toLowerCase();
}
