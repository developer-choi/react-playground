import React, {ComponentPropsWithoutRef, DragEvent, useCallback, useState} from 'react';
import {myClassName} from '@util/libraries/classnames';
import InputFile, {InputFileProp} from '@component/extend/InputFile';
import styled from 'styled-components';
import {preventDefault} from '@util/extend/browser/event';

export interface DragAndDropProps extends ComponentPropsWithoutRef<'label'>, Pick<InputFileProp, 'onChangeFiles' | 'onChangeFile' | 'accept'> {
  enableFileExplorer?: boolean;
}

export default function DragAndDrop({className, enableFileExplorer, children, onChangeFile, onChangeFiles, accept, ...rest}: DragAndDropProps) {
  const [dragging, setDragging] = useState(false);

  const _onDrop = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
    const files = Array.from(event.dataTransfer.files);
    setDragging(false);
    onChangeFiles?.(files);
    onChangeFile?.(files[0]);
  }, [onChangeFile, onChangeFiles]);

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
      className={myClassName({dragging, clickable: enableFileExplorer}, className)}
      onDrop={_onDrop}
      onDragLeave={_onDragLeave}
      onDragEnter={_onDragEnter}
      onDragOver={_onDragOver}
      onClick={enableFileExplorer ? undefined : preventDefault}
      {...rest}
    >
      {children}
      <StyledInputFile
        multiple={!!onChangeFiles}
        onChangeFiles={onChangeFiles}
        onChangeFile={onChangeFile}
        accept={accept}
      />
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
