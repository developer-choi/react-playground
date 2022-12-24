import React, {useCallback, useState} from 'react';
import InputFile from '@component/extend/InputFile';
import Button from '@component/atom/button/Button';
import styled from 'styled-components';
import FileApi from '@api/FileApi';

export default function ApiProgressPage() {
  const [file, setFile] = useState<File>();
  const [percent, setPercent] = useState(0);

  const save = useCallback(async () => {
    if (!file) {
      return;
    }

    const api = new FileApi();

    try {
      await api.postUpload(file, ({total, loaded}: ProgressEvent) => {
        const value = loaded / total;
        console.log('percent', value * 100);
        setPercent(value);
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
