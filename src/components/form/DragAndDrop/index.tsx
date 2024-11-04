import React, {ComponentPropsWithoutRef, DragEvent, useCallback, useState} from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import InputFile, {InputFileProps} from '@/components/form/InputFile';
import {preventDefault} from '@/utils/extend/event';

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
        multiple={multiple}
        onChangeFiles={onChangeFiles}
        accept={accept}
      />
    </label>
  );
};
