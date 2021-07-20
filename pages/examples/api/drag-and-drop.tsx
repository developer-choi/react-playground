import React, {useState} from 'react';
import styled from 'styled-components';
import DragAndDrop from '@components/atom/DragAndDrop';
import {flexCenter} from '../../../src/utils/style/css';
import Head from 'next/head';
import type {ImageWrapper} from '@components/extend/InputFile';

export default function DragAndDropPage() {
  
  const [datas, setDatas] = useState<ImageWrapper[]>([]);
  
  return (
      <>
        <Head>
          <title>drag-and-drop page</title>
        </Head>
        <Wrap>
          <Label>
            <DropBox onChangeImages={setDatas} enableClickToFileExplorer>
              <Message>Drag Here</Message>
            </DropBox>
          </Label>
        </Wrap>
        {datas.map(({image}, index) => (
            <img key={index} src={image.src} alt="user select image"/>
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
