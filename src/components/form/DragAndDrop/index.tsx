import React, {ComponentPropsWithoutRef, DragEvent, useCallback, useState} from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import InputFile, {InputFileProps} from '@/components/form/Input/inputFile';
import {preventDefault} from '@forworkchoe/core/utils';

export interface DragAndDropProps extends ComponentPropsWithoutRef<'label'>, Pick<InputFileProps, 'onChangeFiles' | 'accept' | 'multiple'> {
  enableFileExplorer?: boolean;
}

export default function DragAndDrop({className, enableFileExplorer, children, onChangeFiles, accept, multiple, ...rest}: DragAndDropProps) {
  const [dragging, setDragging] = useState(false);

  const customOnDrop = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
    const files = Array.from(event.dataTransfer.files);
    setDragging(false);
    onChangeFiles?.(files);
  }, [onChangeFiles]);

  const customOnDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const customOnDragEnter = useCallback(() => {
    setDragging(true);
  }, []);

  return (
    <label
      htmlFor="drag-and-drop" // 이거 안하면, children에 <HiddenInput이 올 때 HiddenInput으로 연결됨.
      className={classNames(styles.wrap, {dragging, clickable: enableFileExplorer}, className)}
      onDrop={customOnDrop}
      onDragLeave={customOnDragLeave}
      onDragEnter={customOnDragEnter}
      onDragOver={preventDefault} // 이거 해야 onDrop 가능
      onClick={enableFileExplorer ? undefined : preventDefault}
      {...rest}
    >
      {children}
      <InputFile
        id="drag-and-drop"
        multiple={multiple}
        onChangeFiles={onChangeFiles}
        accept={accept}
      />
    </label>
  );
};
