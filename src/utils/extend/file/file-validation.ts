import {getFileSizeDetail} from '@/utils/extend/file/file-size';
import {ValidateError} from '@/utils/extend/file/common';

export interface FileValidateOption {
  limitSize?: number;
  allowExtensions?: string[]; // . 포함해야함.
  maxCount?: number;
  enableDuplicated?: boolean; // default false
}

/**
 * @exception ValidateError 용량 제한 벗어난 경우
 * @exception ValidateError 확장자 벗어난 경우
 * TODO 이미지에서도 쓰지만 이미지를 제외한 나머지 파일에서도 사용 가능하게 만들어야함.
 *
 * @param newFiles 새로 추가하려는 파일 (FULL 유효성검증 대상)
 * @param options 유효성검증할 옵션
 * @param previousValidatedFiles (기존에 미리보기로 등록했던 파일들, 이 함수를 통해 유효성검증이 완료되어있어야함), 절대 <input type="file"에서 multiple이 아닌 단일 파일모드인 경우 이 매개변수가 전달되면 안됨.
 */
export function validateFiles(newFiles: File[], options: FileValidateOption, previousValidatedFiles?: File[]) {
  const {limitSize, allowExtensions, maxCount, enableDuplicated} = options;

  const newFileCountIsExceed = (maxCount !== undefined) && newFiles.length > maxCount;
  const totalFileCountIsExceed = (maxCount !== undefined) && previousValidatedFiles?.length && (newFiles.length + previousValidatedFiles.length) > maxCount;

  if (newFileCountIsExceed || totalFileCountIsExceed) {
    throw new ValidateError(`최대 ${maxCount}개의 파일만 가능합니다.`);
  }

  const previousFileNames = previousValidatedFiles?.map(file => file.name);
  const duplicatedFile = (!enableDuplicated || !previousFileNames) ? undefined : newFiles.find(file => previousFileNames.includes(file.name));

  if (duplicatedFile) {
    throw new ValidateError(`${duplicatedFile.name}파일이 이미 존재합니다.`);
  }

  newFiles.forEach(file => {
    const {size, name} = file;

    if ((limitSize !== undefined) && (limitSize < size)) {
      throw new ValidateError(`파일의 용량은 ${getFileSizeDetail(limitSize).text} 를 초과하면 안됩니다.`);
    }

    if(allowExtensions && allowExtensions.length > 0) {
      const extension = getFileExtension(name);
      const _allowExtensions = allowExtensions.map(extension => cleanFileExtension(extension));

      if (!extension || !_allowExtensions.includes(extension)) {
        throw new ValidateError(`지원가능한 확장자는 ${_allowExtensions.join(', ')} 입니다.`);
      }
    }
  });
}

function getFileExtension(filename: string): string | undefined {
  if (filename.includes('.')) {
    const lastIndex = filename.lastIndexOf('.') + 1;
    return cleanFileExtension(filename.slice(lastIndex));
  } else {
    return undefined;
  }
}

/**
 * 1. dot이 포함된 확장자 명에서 dot을 제거
 * 2. 확장자 이름을 소문자로 변경
 */
function cleanFileExtension(extensionWithDot: string) {
  let value = extensionWithDot;

  if (extensionWithDot.startsWith('.')) {
    value = value.slice(0);
  }

  return value.toLowerCase();
}
