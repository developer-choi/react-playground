import React, {useState} from 'react';
import styled from 'styled-components';
import DragAndDrop from '@component/atom/DragAndDrop';
import {flexCenter} from '@util/style/css';
import {getFileRule} from '@util/extend/file/file-validation';
import {fileSizeToByte} from '@util/extend/file/file-size';
import useCreateObjectUrls from '@util/custom-hooks/useCreateObjectUrl';

export default function DragAndDropPage() {
  const [files, setFiles] = useState<File[]>([]);
  const images = useCreateObjectUrls({
    files,
    validateOption: IMAGE_RULE.validateOption
  });

  return (
    <>
      <Wrap>
        <Label>
          <DropBox onChangeFiles={setFiles} enableClickToFileExplorer accept={IMAGE_RULE.accept}>
            <Message>Drag Here</Message>
          </DropBox>
        </Label>
      </Wrap>
      {images.map((image) => (
        <img key={image} src={image} alt="user select image"/>
      ))}
    </>
  );
}

const IMAGE_RULE = getFileRule({
  extensions: ['jpg', 'png'],
  limitSize: fileSizeToByte(20 ,'MB')
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
