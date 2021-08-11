import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import DragAndDrop from '@components/atom/DragAndDrop';
import {flexCenter} from '../../../src/utils/style/css';
import Head from 'next/head';
import type {ImageWrapper} from '@components/extend/InputFile';
import type {ConvertImageCallback} from '@components/extend/InputFile';

export default function DragAndDropPage() {
  
  const [images, setImages] = useState<ImageWrapper[]>([]);
  const [loading, setLoading] = useState(false);
  
  const onConvertFileToImage = useCallback(async (convertCallback: ConvertImageCallback) => {
    try {
      setLoading(true);
      setImages(await convertCallback());
      
    } finally {
      setLoading(false);
    }
  }, []);
  
  return (
      <>
        <Head>
          <title>drag-and-drop page</title>
        </Head>
        <Wrap>
          <Label>
            <DropBox onConvertFileToImage={onConvertFileToImage} enableClickToFileExplorer>
              <Message>Drag Here</Message>
            </DropBox>
          </Label>
        </Wrap>
        {loading ?
            <Box/>
            :
            images.map(({image}, index) => (
                <img key={index} src={image.src} alt="user select image"/>
            ))
        }
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

const Box = styled.div`
  width: 300px;
  height: 300px;
  background-color: lightgray;
`;

const Message = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Label = styled.label`
  cursor: pointer;
`;
