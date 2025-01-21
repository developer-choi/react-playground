import {
  CoreSingleImageFileParameter, CoreImagePreviewParameter, FileAndThumbnail,
  getInitialSingleFileAndThumbnail, SingleFileAndThumbnail, useCoreImageFile, useCoreSingleImageFile
} from '@/utils/extend/file/handle-image/core';
import {useState} from 'react';

// https://docs.google.com/document/d/1_9-Bw4SihS6DGpskF8Xor_gaahHetDfKDk6QJeZQ6Ig/edit?tab=t.0
export interface SingleImageFileParameter extends Pick<CoreSingleImageFileParameter, 'options'> {
  initialImageUrl?: string; // 이미지 안바꾸고 제출하면 기존이미지 URL만 있고 파일은 없는 상태가됨.
}

export function useSingleImageFile({initialImageUrl, options}: SingleImageFileParameter) {
  const [item, setItem] = useState<Partial<SingleFileAndThumbnail>>(getInitialSingleFileAndThumbnail(initialImageUrl));

  return useCoreSingleImageFile({
    options,
    item,
    setItem
  });
}

export type MultipleImageFileParameter = Pick<CoreImagePreviewParameter, 'options'>;

export function useMultipleImageFile({options}: MultipleImageFileParameter) {
  const [list, setList] = useState<FileAndThumbnail[]>([]);

  return useCoreImageFile({
    setList,
    list,
    options,
    multiple: true
  });
}
