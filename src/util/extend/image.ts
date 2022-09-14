import {FileValidateOption, validateFile} from '@util/extend/file';
import ValidateError from '@util/handle-error/ValidateError';

export interface FileConvertOption {
  validate?: FileValidateOption;
  // compression?: ImageCompressionOption;
}

/**
 * https://developer.mozilla.org/ko/docs/Web/API/File
 * https://developer.mozilla.org/ko/docs/Web/API/File/Using_files_from_web_applications
 * https://developer.mozilla.org/ko/docs/Web/API/Blob
 * https://developer.mozilla.org/ko/docs/Web/API/FileReader
 *
 * File은 Blob을 implements한것. 그러므로 File도 이 함수 사용가능.
 * Blob 객체는 파일류의 불변하는 미가공 데이터를 나타내고, 다양한 형태로 변환이 가능.
 * 텍스트와 이진데이터로도 변환이 가능하지만 지금 나에게는 이게 필요가없음.
 *
 * 내가 원하는 형태는 이미지를 DataUri 형태로 바꾼것.
 * html문서에 삽입할 수 있기도 하고, 이 형태 자체로 저장을 할 수 있기도 함.
 *
 * Blob을 DataUri형태로 바꾸려면 FileReader API를 이용해야함.
 * readAsDataURL를 파일로 읽기 시작하도록 한 다음에,
 * onload와 onerror로 성공/실패에 대해 처리를 하면 되며,
 * 나는 이것을 Promise로 Wrapping했음.
 *
 * error case를 테스트하는 방법은 간단하게 readAsDataURL의 첫 번째 매개변수에 읽을수없는 이상한문자열(특수문자 등)을 넣어보면
 * onerror callback이 호출됨.
 */
async function fileToDataUri(file: File, option?: FileConvertOption): Promise<{file: File, dataUri: string}> {
  if (option?.validate) {
    validateFile(file, option.validate);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve({
        file,
        dataUri: reader.result as string
      });
    };
    reader.onerror = function (event) {
      console.error('This file could not be converted.', reader.error, event);
      reject(new ValidateError('This file could not be converted. Please select another file.'));
    };
  });
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

export async function fileToImageElement(file: File, option?: FileConvertOption) {
  const {file: convertedFile, dataUri} = await fileToDataUri(file, option);
  const image = await srcToImageElement(dataUri);

  return {
    image,
    file: convertedFile
  };
}
