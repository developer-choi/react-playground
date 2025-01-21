import {useCallback, useEffect, useRef} from 'react';
import {
  FileValidateOption,
  validateExtension,
  validateFiles,
  validateImageFile
} from '@/utils/extend/file/file-validation';
import {InputFileProps} from '@/components/form/Input/inputFile';
import {useOpenModal} from '@/utils/extend/modal';
import {useHandleClientSideError} from '@/utils/service/error/client-side';
import {v4 as uuidv4} from 'uuid';
import {ValidateError} from '@/utils/service/error/both-side';

export interface CoreSingleImageFileParameter {
  options?: Partial<FileValidateOption>; // 기본값은 이미지 전체 가능, 따로 지정할 경우 dot을 포함해야함. (ex: ['.jpg']), 이걸로 input type file의 accept도 만듬.
  setItem: (singleFile: Partial<SingleFileAndThumbnail>) => void // 초기화 하는 경우 없을 수 있음
  item: SingleFileAndThumbnail;
}

// 프로필이미지 변경폼 처럼 단일 이미지 미리보기만 필요한 경우에 씀
export function useCoreSingleImageFile({options, item, setItem}: CoreSingleImageFileParameter) {
  const setList = useCallback((files: FileAndThumbnail[]) => {
    const extended: FileAndThumbnail | undefined = files[0];

    setItem({
      file: extended?.file,
      image: extended?.image
    });
  }, [setItem]);

  const core = useCoreImageFile({
    options,
    multiple: false,
    setList,
    list: (!item.file || !item.image) ? [] : [{id: 'single-file', image: item.image, file: item.file}]
  });

  return {
    image: item?.image,
    file: item?.file,
    clearItem: core.clearItem,
    inputFileProps: core.inputFileProps
  };
}

export interface CoreImagePreviewParameter extends Pick<CoreSingleImageFileParameter, 'options'> {
  list: FileAndThumbnail[];
  setList: (list: FileAndThumbnail[]) => void; // 배열로 전달되는 list는 빈배열일 수 있음. (미리보기 다 삭제하는 경우)
  multiple: boolean;
}

/**
 * @return list: 썸네일 이미지, 원본 파일의 리스트
 * @return removeItem: 일부 썸네일 미리보기 삭제 + 연결된 원본파일 삭제
 * @return clearItem: 전체 썸네일 미리보기, 연결된 전체 원본파일 삭제
 * @return inputFileProps: <InputFile>에 전달할 props 제작
 */
export function useCoreImageFile({options, list, setList, multiple}: CoreImagePreviewParameter) {
  const onChangeFiles = useOnChangeFiles({options, list, setList, multiple});

  const removeItem = useCallback((item: FileAndThumbnail) => {
    setList(list.filter(({id}) => id !== item.id));
  }, [list, setList]);

  const clearItem = useCallback(() => {
    setList([]);
  }, [setList]);

  validateExtension(options?.extensions);
  const inputFileProps: Pick<InputFileProps, 'accept' | 'onChangeFiles' | 'multiple'> = {
    accept: !options?.extensions ? 'image/*' : options.extensions.join(','),
    onChangeFiles,
    multiple
  };

  return {
    list,
    removeItem,
    clearItem,
    inputFileProps
  };
}

export interface FileAndThumbnail {
  file: File;
  image: Pick<HTMLImageElement, 'src' | 'alt'>;
  id: string;
}

/** Case
 * 1. initialImageUrl을 전달한 경우, image만 있고 file은 없음
 * 2. initialImageUrl을 전달 안한경우, image랑 file 둘 다 없음
 * 3. 이후 파일을 등록한 경우 둘 다 있음.
 */
export interface SingleFileAndThumbnail {
  file?: File;
  image?: FileAndThumbnail['image'];
}

export function getInitialSingleFileAndThumbnail(initialImageUrl: string | undefined): SingleFileAndThumbnail {
  return {
    image: !initialImageUrl ? undefined : {
      src: initialImageUrl,
      alt: 'preview image'
    },
    file: undefined
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
/**
 * <InputFile>에 전달할 onChangeFiles callback 반환.
 * 이미지 미리보기를 위한 Object Url를 create 및 revoke까지 지원
 */
function useOnChangeFiles({options, list, setList, multiple}: CoreImagePreviewParameter) {
  const {openAlertModal} = useOpenModal();
  const handleClientSideError = useHandleClientSideError();
  const objectUrlRef = useRef<string[]>([]);

  /**
   * 이미지를 등록하고나서 추가로 다시 등록할 때 기존 이미지를 유지할지 여부
   * 1. 근데 이미지 여러개 등록하는 케이스에서는 수많은 웹사이트가 다 기존 이미지 초기화 안하길래
   * 2. 하지만 반대로, 이미지 1개 등록하는 케이스에서는 기존 이미지 무조건 초기화 하길래,
   * multiple 따라가게 했음.
   */
  const keepPrevData = multiple;

  // 페이지 나갈 때 기존에 쌓아왔던 Object URL 전부 다 revoke
  useEffect(() => {
    return () => {
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        objectUrlRef.current.forEach(url => {
          URL.revokeObjectURL(url);
        });
      }, 1000); // 이미지를 새로 업로드하거나, 페이지 나갈 때 즉시 revoke하면 아직 잠깐 기존 이미지 보여야 하는 시점에 콘솔에 에러가 뜸. 그걸 방지하기위함.
    };
  }, []);

  return useCallback(async (files: File[]) => {
    try {
      if (options) {
        // 단일 이미지로 쓸 때는 항상 교체하도록
        validateFiles(files, options, !multiple ? undefined : list.map(({file}) => file));
      }

      const newList = await Promise.all(files.map(async file => {
        const url = URL.createObjectURL(file);
        objectUrlRef.current.push(url);
        await validateImageFile(url);

        const extended: FileAndThumbnail = {
          id: uuidv4(),
          image: {
            src: url,
            alt: 'preview image'
          },
          file
        };
        return extended;
      }));

      if (keepPrevData) {
        setList(list.concat(newList));

      } else {
        setList(newList);
      }
    } catch (error) {
      if (error instanceof ValidateError) {
        openAlertModal({
          title: '파일등록',
          content: error.message
        });
      } else {
        handleClientSideError(error);
      }
    }
  }, [options, keepPrevData, multiple, list, setList, openAlertModal, handleClientSideError]);
}
