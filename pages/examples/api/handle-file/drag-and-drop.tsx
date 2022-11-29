import React from 'react';
import styled from 'styled-components';
import DragAndDrop from '@component/atom/DragAndDrop';
import {flexCenter} from '@util/services/style/css';
import {getFileRule} from '@util/extend/file/file-validation';
import {fileSizeToByte} from '@util/extend/file/file-size';
import useFilesToImages from '@util/custom-hooks/useFilesToImages';
import Link from 'next/link';

export default function DragAndDropPage() {
  const {images, onChangeFiles} = useFilesToImages({
    validateOption: IMAGE_RULE.validateOption
  });

  return (
    <>
      <Link href="/">
        <a>Go to home</a>
      </Link>
      <Wrap>
        <Label>
          <DropBox onChangeFiles={onChangeFiles} enableFileExplorer accept={IMAGE_RULE.accept}>
            <Message>Drop Here</Message>
          </DropBox>
        </Label>
      </Wrap>
      {images.map((image) => (
        <img key={image.src} src={image.src} alt="user select image"/>
      ))}
    </>
  );
}

const IMAGE_RULE = getFileRule({
  allowExtensions: ['jpg', 'png'],
  limitSize: fileSizeToByte(20, 'MB'),
  maxCount: 10
});

const Wrap = styled.div`
  display: flex;
`;

const DropBox = styled(DragAndDrop)`
  width: 300px;
  height: 300px;
  border: 1px solid gray;
  
  ${flexCenter};
  
  &.dragging {
    border: 3px dashed red;
  }
`;

const Message = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Label = styled.label`
  cursor: pointer;
`;
