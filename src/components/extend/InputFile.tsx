import React, {ChangeEvent, ComponentProps, useCallback} from 'react';
import {
  convertBlobToImage,
  convertFileSizeToNumber, convertNumberToFileSize,
  FileSize,
  getFileExtension,
  ZERO_FILE_SIZE
} from '../../utils/extend/file';
import {toast} from 'react-toastify';

export interface ImageWrapper {
  image: HTMLImageElement;
  file: File;
}

export type ConvertImageCallback = () => Promise<ImageWrapper[]>;

interface HandleFileProps {
  maxSize?: number | FileSize;
  allowExtensions?: string[]; //확장자에서 .는 제외하고 제공해야함.
  
  //용량제한, 확장자제한, 이미지인지 유효성검증을 모두 통과한 경우에만 호출
  onChangeImages?: (datas: ImageWrapper[]) => void
  onConvertFileToImage?: (convertCallback: ConvertImageCallback) => void;
}

export interface CustomInputFileProp extends HandleFileProps {
  //용량제한, 확장자 제한을 통과한 경우에만 호출 (빈값인경우에도 호출)
  onChangeFiles?: (files: File[]) => void;
  onChangeFile?: (file: File) => void;
}

export type InputFileProp = Omit<ComponentProps<'input'>, 'type'> & CustomInputFileProp;

export default function InputFile({onChange, maxSize, allowExtensions, accept, onChangeFiles, onChangeFile, onChangeImages, onConvertFileToImage, ...rest}: InputFileProp) {
  
  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  
    const files = Array.from(event.target.files ?? new FileList() as FileList);
  
    /**
     * https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file#answer-60886920
     * 1. a.png파일 선택
     * 2. UI상으로 a.png파일이 목록에 추가됨
     * 3. 해당 파일목록을 목록에서 삭제
     * 4. 다시 파일탐색기 열어서 a.png 추가
     * ==> 추가안됨
     *
     * 이 버그를 해결하기위해 추가
     */
    event.target.value = '';
  
    handleOnChangeFile(files, {
      maxSize,
      allowExtensions,
      onChangeFiles,
      onChangeFile,
      onChangeImages,
      onConvertFileToImage
    });
  }, [onChange, allowExtensions, maxSize, onChangeFiles, onChangeImages, onChangeFile, onConvertFileToImage]);
  
  const _accept = accept === undefined ? (allowExtensions ?? []).map(extension => '.' + extension).join(',') : accept;
  
  return (
      <input type="file" onChange={_onChange} accept={_accept} {...rest}/>
  );
}

function isIncludeNotAllowedExtensions(files: File[], allowExtensions: string[]) {
  return files.every(({name}) => {
    const extension = getFileExtension(name);
    return extension ? allowExtensions.map(value => value.toLowerCase()).includes(extension.toLowerCase()) : false;
  });
}

function handleClientError(message: string) {
  toast.error(message);
}

export function handleOnChangeFile(files: File[], props: CustomInputFileProp) {
  const {
    onChangeImages,
    onConvertFileToImage,
    onChangeFiles,
    onChangeFile,
    allowExtensions,
    maxSize
  } = props;
  
  if (allowExtensions && !isIncludeNotAllowedExtensions(files, allowExtensions)) {
    handleClientError(`지원되는 확장자는 ${allowExtensions.join(', ')} 입니다`);
    return;
  }
  
  const sizeToByte = maxSize === undefined ? 0 : typeof maxSize === 'number' ? maxSize : convertFileSizeToNumber(maxSize);
  const sizeToFieSize = maxSize === undefined ? ZERO_FILE_SIZE : typeof maxSize === 'number' ? convertNumberToFileSize(maxSize) : maxSize;
  if (maxSize !== undefined && files.some(({size}) => sizeToByte < size)) {
    handleClientError(`파일의 용량은 ${sizeToFieSize.value.toFixed(2)}${sizeToFieSize.unit} 까지 가능합니다.`);
    return;
  }
  
  onChangeFiles?.(files);
  onChangeFile?.(files[0]);
  
  const convert = async () => {
    try {
      const datas = await Promise.all(files.map(file => convertBlobToImage(file)));
      return datas.map(({image, blob}) => ({image, file: blob as File}));
    } catch (error) {
      handleClientError('잘못된 이미지 파일입니다. 다른 파일을 선택해주세요.');
      return [];
    }
  };
  
  if (onConvertFileToImage) {
    onConvertFileToImage?.(convert);
  }
  
  if (onChangeImages) {
    convert().then(result => onChangeImages(result));
  }
}
