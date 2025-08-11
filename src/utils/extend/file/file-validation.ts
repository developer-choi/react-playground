import {getFileSizeDetail} from '@/utils/extend/file/file-size';
import {ValidateError} from '@/utils/service/common/error/class';

export interface FileValidateOption {
  limitSize: number;
  extensions: string[]; // . 포함해야함.
  maxCount: number;
  enableDuplicated: boolean; // default false
}

/**
 * @exception ValidateError 용량 제한 벗어난 경우
 * @exception ValidateError 확장자 벗어난 경우
 * @exception ValidateError maxCount보다 많은 갯수의 파일을 전달한 경우
 * @exception ValidateError 기존에 등록된 파일과 동일한 파일을 등록하려고 한 경우
 *
 * @param newFiles 새로 추가하려는 파일 (FULL 유효성검증 대상)
 * @param options 유효성검증할 옵션
 * @param previousValidatedFiles (기존에 미리보기로 등록했던 파일들, 이 함수를 통해 유효성검증이 완료되어있어야함), 절대 <input type="file"에서 multiple이 아닌 단일 파일모드인 경우 이 매개변수가 전달되면 안됨.
 */
export function validateFiles(newFiles: File[], options: Partial<FileValidateOption>, previousValidatedFiles?: File[]) {
  const {limitSize, extensions, maxCount, enableDuplicated} = options;

  validateExtension(extensions);

  if (maxCount !== undefined) {
    validateFileMaxCount(newFiles, maxCount, previousValidatedFiles);
  }

  if (enableDuplicated && previousValidatedFiles) {
    validateFileIsDuplicated(newFiles, previousValidatedFiles);
  }

  newFiles.forEach(file => {
    if (limitSize) {
      validateFileSize(file, limitSize);
    }

    if(extensions && extensions.length > 0) {
      validateFileExtension(file.name, extensions);
    }
  });
}


/**
 * @param src 일반적으로 File을 URL.createObjectURL로 만든거
 */
export async function validateImageFile(src: string): Promise<void> {
  const image = new Image();
  image.src = src;

  return new Promise((resolve, reject) => {
    image.onload = function () {
      resolve();
    };

    image.onerror = function () {
      reject(new ValidateError('Unable to convert to image.'));
    };
  });
}

export function validateExtension(extension: undefined | string | string[]) {
  if (extension === undefined) {
    return;
  }

  const extensions = typeof extension === 'string' ? [extension] : extension;

  if (extensions.some(value => !value.includes('.'))) {
    throw new ValidateError('확장자 명에는 . (dot)이 반드시 있어야합니다.');
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
function validateFileSize(file: File, limitSize: number) {
  if (limitSize < file.size) {
    throw new ValidateError(`파일의 용량은 ${getFileSizeDetail(limitSize).text} 를 초과하면 안됩니다.`);
  }
}

function validateFileMaxCount(newFiles: File[], maxCount: number, previousValidatedFiles?: File[]) {
  const newFileCountIsExceed = newFiles.length > maxCount;
  const totalFileCountIsExceed = previousValidatedFiles?.length && (newFiles.length + previousValidatedFiles.length) > maxCount;
  if (newFileCountIsExceed || totalFileCountIsExceed) {
    throw new ValidateError(`최대 ${maxCount}개의 파일만 가능합니다.`);
  }
}

/**
 * @param newFiles 새로 추가하려는 파일
 * @param previousValidatedFiles 기존에 등록되어있었던 파일
 * @exception ValidateError 기존에 이미 등록되있던 파일들중 똑같은 파일명이 newFiles에 있는 경우
 */
function validateFileIsDuplicated(newFiles: File[], previousValidatedFiles: File[]) {
  const previousFileNames = previousValidatedFiles.map(file => file.name);
  const duplicatedFile = newFiles.find(file => previousFileNames.includes(file.name));

  if (duplicatedFile) {
    throw new ValidateError(`${duplicatedFile.name}파일이 이미 존재합니다.`);
  }
}

/**
 * @param filename 파일이름. ex) some.png
 * @param extensions dot이 포함된 확장자 배열. ex) ['.png']
 * @exception ValidateError 파일명에 확장자가 없는 경우
 * @exception ValidateError 파일의 확장자가 extensions에 없는 확장자 인 경우
 */
function validateFileExtension(filename: string, extensions: string[]) {
  if (!filename.includes('.')) {
    throw new ValidateError('파일이름에 확장자가 없습니다.');
  }

  const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();

  if (!extensions.map(value => value.toLowerCase()).includes(extension)) {
    throw new ValidateError(`지원가능한 확장자는 ${extensions.join(', ')} 입니다.`);
  }
}
