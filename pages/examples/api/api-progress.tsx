import React, {useCallback, useState} from 'react';
import InputFile from '@components/extend/InputFile';
import {Button} from '@components/atom/button/button-presets';
import axios from 'axios';
import FormData from 'form-data';
import styled from 'styled-components';
import {loadVideoMetadata} from '../../../src/utils/extend/video';

export default function ApiProgressPage() {
  const [file, setFile] = useState<File>();
  const [percent, setPercent] = React.useState(0);
  
  React.useEffect(() => {
    (async () => {
      if (file) {
        try {
          const {duration} = await loadVideoMetadata(file);
          console.log(duration);
        } catch (error) {
          console.log(error);
        }
      }
    })().then();
  }, [file]);
  
  const save = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: ({total, loaded}: ProgressEvent) => {
          const value = loaded / total;
          console.log('percent', value * 100);
          setPercent(value);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [file]);
  
  return (
      <div>
        {file?.name}
        <InputFile onChangeFile={setFile}/>
        <Button onClick={save}>Save</Button>
        <Stick style={{width: `${percent * 100}%`}}/>
      </div>
  );
}

const Stick = styled.div`
  transition: width 0.5s;
  height: 20px;
  background: ${props => props.theme.main};
`;
