import React, {ChangeEvent, ComponentProps, useCallback} from 'react';
import {
  convertBlobToImage,
  convertFileSizeToNumber, convertNumberToFileSize,
  FileSize,
  getFileExtension,
  ZERO_FILE_SIZE
} from '../../utils/extend/file';

export interface ImageWrapper {
  image: HTMLImageElement;
  file: File;
}

//onChangeFiles를 위한 props
interface HandleFileSizeProps {
  maxSize?: number | FileSize;
  handleFileSizeOver?: (maxSize: FileSize, files: File[]) => void;
}

//onChangeFiles를 위한 props
interface HandleExtensionProps {
  //확장자에서 .는 제외하고 제공해야함.
  allowExtensions?: string[];
  handleNotAllowedExtension?: (allowExtensions: string[], files: File[]) => void;
}

interface HandleImageProps {
  handleOnChangeImageError?: (error: Error) => void;
  
  //용량제한, 확장자제한, 이미지인지 유효성검증을 모두 통과한 경우에만 호출
  onChangeImages?: (datas: ImageWrapper[]) => void
}

export interface CustomInputFileProp extends HandleImageProps, HandleFileSizeProps, HandleExtensionProps {
  //용량제한, 확장자 제한을 통과한 경우에만 호출 (빈값인경우에도 호출)
  onChangeFiles?: (files: File[]) => void;
}

export type InputFileExtendProp = Omit<ComponentProps<'input'>, 'type'> & CustomInputFileProp;

export default function InputFileExtend({
                                          onChange,
                                          maxSize,
                                          handleFileSizeOver = alertHandleFileSizeOver,
                                          allowExtensions,
                                          accept,
                                          handleNotAllowedExtension = alertHandleNotAllowedExtension,
                                          onChangeFiles,
                                          onChangeImages,
                                          handleOnChangeImageError = alertHandleOnChangeImageError,
                                          ...rest
                                        }: InputFileExtendProp) {
  
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
  
    if (allowExtensions && !isIncludeNotAllowedExtensions(files, allowExtensions)) {
      handleNotAllowedExtension(allowExtensions, files);
      return;
    }
    
    const sizeToByte = maxSize === undefined ? 0 : typeof maxSize === 'number' ? maxSize : convertFileSizeToNumber(maxSize);
    const sizeToFieSize = maxSize === undefined ? ZERO_FILE_SIZE : typeof maxSize === 'number' ? convertNumberToFileSize(maxSize) : maxSize;
    if (maxSize !== undefined && files.some(({size}) => sizeToByte < size)) {
      handleFileSizeOver(sizeToFieSize, files)
      return;
    }
  
    onChangeFiles?.(files);
  
    if (onChangeImages) {
      (async () => {
        try {
          const datas = await Promise.all(files.map(file => convertBlobToImage(file)));
          onChangeImages(datas.map(({image, blob}) => ({image, file: blob as File})));
        } catch (error) {
          handleOnChangeImageError(error);
        }
      })().then();
    }
  }, [onChange, handleNotAllowedExtension, allowExtensions, maxSize, handleFileSizeOver, onChangeFiles, onChangeImages, handleOnChangeImageError]);
  
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

function alertHandleFileSizeOver({value, unit}: FileSize) {
  alert(`파일의 용량은 ${value.toFixed(2)}${unit} 까지 가능합니다.`);
}

function alertHandleNotAllowedExtension(allowExtensions: string[]) {
  alert(`지원되는 확장자는 ${allowExtensions.join(', ')} 입니다`);
}

function alertHandleOnChangeImageError() {
  alert('잘못된 이미지 파일입니다. 다른 파일을 선택해주세요.');
}
