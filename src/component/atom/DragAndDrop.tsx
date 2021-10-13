import React, {ComponentPropsWithoutRef, DragEvent, useCallback, useMemo, useState} from 'react';
import {myClassName} from '@util/libraries/classnames';
import InputFile, {CustomInputFileProp, handleOnChangeFile} from '@component/extend/InputFile';
import styled from 'styled-components';

export interface DragAndDropProps extends ComponentPropsWithoutRef<'label'>, Omit<CustomInputFileProp, 'onChangeFiles'> {
  onDropFiles?: (files: File[]) => void;
  enableClickToFileExplorer?: boolean;
}

export default function DragAndDrop({onDropFiles, className, enableClickToFileExplorer, children, allowExtensions, maxSize, onChangeImages, onConvertFileToImage, ...rest }: DragAndDropProps) {
  const [dragging, setDragging] = useState(false);
  
  const inputTypeFileProps = useMemo<CustomInputFileProp>(() => ({
    maxSize,
    onChangeImages,
    onChangeFiles: onDropFiles,
    allowExtensions,
    onConvertFileToImage
  }), [maxSize, onChangeImages, onDropFiles, allowExtensions, onConvertFileToImage]);
  
  const _onDrop = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
    const files = Array.from(event.dataTransfer.files);
    setDragging(false);
    handleOnChangeFile(files, inputTypeFileProps);
  }, [inputTypeFileProps]);
  
  const _onDragLeave = useCallback(() => {
    setDragging(false);
  }, []);
  
  const _onDragEnter = useCallback(() => {
    setDragging(true);
  }, []);
  
  const _onDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
  }, []);
  
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
