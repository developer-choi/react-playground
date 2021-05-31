import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {flexCenter} from '../src/utils/style/css';
import DragAndDrop from '@components/atom/DragAndDrop';
import {blobToDataUrl} from '../src/utils/extend/blob';

export default function Page() {
  
  const [files, setFiles] = useState<FileList>();
  const [fileDataUri, setFileDataUri] = useState<string[]>([]);
  
  useEffect(() => {
    if (files) {
      (async () => {
        setFileDataUri(await Promise.all(Array.from(files).map(file => blobToDataUrl(file))));
      })().then();
    }
  }, [files]);
  
  return (
      <>
        <Wrap onDropFiles={setFiles}>
          <Message>Drag Here</Message>
        </Wrap>
        {fileDataUri.map((dataUri, index) => (
            <img key={index} src={dataUri} alt="user select image"/>
        ))}
      </>
  );
}

const Wrap = styled(DragAndDrop)`
  width: 300px;
  height: 300px;
  border: 3px solid black;
  
  ${flexCenter};
  
  &.dragging {
    border: 3px dashed red;
  
    //이거 안하면 자식위를 드래그한상태로 마우스 커서가 지나갈 때 onDragLeave event가 발생함.
    * {
      pointer-events: none;
    }
  }
`;

const Message = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
