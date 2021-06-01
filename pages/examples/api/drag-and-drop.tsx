import React, {ChangeEvent, useEffect, useState} from 'react';
import {blobToDataUrl} from '../../../src/utils/extend/blob';
import styled from 'styled-components';
import DragAndDrop from '@components/atom/DragAndDrop';
import {flexCenter} from '../../../src/utils/style/css';
import Head from 'next/head';

export default function DragAndDropPage() {
  
  const [files, setFiles] = useState<FileList>();
  const [fileDataUri, setFileDataUri] = useState<string[]>([]);
  
  const onChangeInput = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target;
    if (files) {
      setFiles(files);
    }
  }, []);
  
  useEffect(() => {
    if (files) {
      (async () => {
        setFileDataUri(await Promise.all(Array.from(files).map(file => blobToDataUrl(file))));
      })().then();
    }
  }, [files]);
  
  /**
   * 드래그앤드롭이랑 파일버튼이랑 같이있는경우에 대해 대응하려고 만들어본건데
   * 파일버튼 클릭했을 때 :focus-within이 같이 스타일링되서 보기흉하더라.
   * 그레서 :not(:active):focus-within으로 선택자 해봐도 안됬었음.
   */
  return (
      <>
        <Head>
          <title>drag-and-drop page</title>
        </Head>
        <Wrap>
          <Label>
            <Input type="file" accept="image/*" onChange={onChangeInput} multiple/>
            <DropBox onDropFiles={setFiles}>
              <Message>Drag Here</Message>
            </DropBox>
          </Label>
        </Wrap>
        {fileDataUri.map((dataUri, index) => (
            <img key={index} src={dataUri} alt="user select image"/>
        ))}
      </>
  );
}

const Wrap = styled.div`
  display: flex;
`;

const DropBox = styled(DragAndDrop)`
  width: 300px;
  height: 300px;
  
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

const Label = styled.label`
  cursor: pointer;
  
  :focus-within {
  
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;
