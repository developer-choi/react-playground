import React, {useState} from 'react';
import styled from 'styled-components';
import DragAndDrop from '@components/atom/DragAndDrop';
import {flexCenter} from '../../../src/utils/style/css';
import Head from 'next/head';
import {ImageWrapper} from '@components/extend/InputFileExtend';

export default function DragAndDropPage() {
  
  const [datas, setDatas] = useState<ImageWrapper[]>([]);
  
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
  
  ${flexCenter};
  
  &.dragging {
    border: 3px dashed red;
  }
  
  &.clickable {
    cursor: pointer;
  }
`;

const Message = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Label = styled.label`
  cursor: pointer;
`;
