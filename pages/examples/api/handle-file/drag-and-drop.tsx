import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import DragAndDrop from '@component/atom/DragAndDrop';
import {flexCenter} from '@util/style/css';
import {fileToDataUri} from '@util/extend/image';
import {fileSizeToByte, getFileRule} from '@util/extend/file';
import {handleClientSideError} from '@util/handle-error/client-side-error';

export default function DragAndDropPage() {

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onChangeFiles = useCallback(async (files: File[]) => {
    setLoading(true);
    try {
      const results = await Promise.all(files.map(file => fileToDataUri(file, IMAGE_RULE.convertOption)));
      setImages(results.map(({dataUri}) => dataUri));
    } catch (error) {
      handleClientSideError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Wrap>
        <Label>
          <DropBox onChangeFiles={onChangeFiles} enableClickToFileExplorer accept={IMAGE_RULE.accept}>
            <Message>Drag Here</Message>
          </DropBox>
        </Label>
      </Wrap>
      {loading ?
        <Box>LOADING...</Box>
        :
        images.map((src, index) => (
          <img key={index} src={src} alt="user select image"/>
        ))
      }
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

const Box = styled.div`
  width: 300px;
  height: 300px;
  background-color: lightgray;
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
`;

const Message = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Label = styled.label`
  cursor: pointer;
`;
