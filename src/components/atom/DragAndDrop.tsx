import React, {ComponentProps, DragEvent, useCallback, useMemo, useState} from 'react';
import {myClassName} from '../../utils/libraries/classnames';
import InputFile, {CustomInputFileProp, handleOnChangeFile} from '@components/extend/InputFile';
import styled from 'styled-components';

export interface DragAndDropProps extends Omit<ComponentProps<'label'>, 'ref'>, Omit<CustomInputFileProp, 'onChangeFiles'> {
  onDropFiles?: (files: File[]) => void;
  enableClickToFileExplorer?: boolean;
}

export default function DragAndDrop({onDropFiles, onDrop, onDragLeave, onDragEnter, onDragOver, className, enableClickToFileExplorer, children,
                                      allowExtensions, maxSize, handleNotAllowedExtension, handleFileSizeOver, handleOnChangeImageError, onChangeImages,
                                      ...rest }: DragAndDropProps) {
  
  const [dragging, setDragging] = useState(false);
  
  const inputTypeFileProps = useMemo<CustomInputFileProp>(() => ({
    handleOnChangeImageError,
    handleFileSizeOver,
    handleNotAllowedExtension,
    maxSize,
    onChangeImages,
    onChangeFiles: onDropFiles,
    allowExtensions
  }), [handleOnChangeImageError, handleFileSizeOver, handleNotAllowedExtension, maxSize, onChangeImages, onDropFiles, allowExtensions]);
  
  const _onDrop = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
    const files = Array.from(event.dataTransfer.files);
    setDragging(false);
    handleOnChangeFile(files, inputTypeFileProps);
    onDrop?.(event);
  }, [onDrop, inputTypeFileProps]);
  
  const _onDragLeave = useCallback((event: DragEvent<HTMLLabelElement>) => {
    setDragging(false);
    onDragLeave?.(event);
  }, [onDragLeave]);
  
  const _onDragEnter = useCallback((event: DragEvent<HTMLLabelElement>) => {
    setDragging(true);
    onDragEnter?.(event);
  }, [onDragEnter]);
  
  const _onDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
    onDragOver?.(event);
  }, [onDragOver]);
  
  return (
      <Wrap
          className={myClassName({dragging, clickable: enableClickToFileExplorer}, className)}
          onDrop={_onDrop}
          onDragLeave={_onDragLeave}
          onDragEnter={_onDragEnter}
          onDragOver={_onDragOver}
          {...rest}
      >
        {children}
        {enableClickToFileExplorer && <StyledInputFile {...inputTypeFileProps} />}
      </Wrap>
  );
};

const Wrap = styled.label`
  &.dragging {
    
    //이거 안하면 자식위를 드래그한상태로 마우스 커서가 지나갈 때 onDragLeave event가 발생함.
    * {
      pointer-events: none;
    }
  }
  
  &.clickable {
    cursor: pointer;
  }
`;

const StyledInputFile = styled(InputFile)`
  display: none;
`;
