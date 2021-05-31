import React, {ComponentProps, DragEvent, useCallback, useState} from 'react';
import classNames from 'classnames';

export interface DragAndDropProps extends ComponentProps<'div'> {
  onDropFiles: (fileList: FileList) => void;
}

export default function DragAndDrop({onDropFiles, onDrop, onDragLeave, onDragEnter, onDragOver, className, ...rest}: DragAndDropProps) {
  
  const [dragging, setDragging] = useState(false);
  
  const _onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
    const files = event.dataTransfer.files;
    setDragging(false);
    onDropFiles(files);
    onDrop?.(event);
  }, [onDropFiles, onDrop]);
  
  const _onDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    setDragging(false);
    onDragLeave?.(event);
  }, [onDragLeave]);
  
  const _onDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    setDragging(true);
    onDragEnter?.(event);
  }, [onDragEnter]);
  
  const _onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
    onDragOver?.(event);
  }, [onDragOver]);
  
  return (
      <div
          className={classNames({dragging}, className)}
          onDrop={_onDrop}
          onDragLeave={_onDragLeave}
          onDragEnter={_onDragEnter}
          onDragOver={_onDragOver}
          {...rest}
      />
  );
};
