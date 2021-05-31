import React, {ChangeEvent, useCallback} from 'react';
import {blobToDataUrl} from '../src/utils/extend/blob';
import styled from 'styled-components';

export default function Page() {
  const [file, setFile] = React.useState<File>();
  const [dataUri, setDataUri] = React.useState('');
  
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const singleFile = event.target.files?.[0];
    if (singleFile) {
      setFile(singleFile);
    }
  }, []);
  
  React.useEffect(() => {
    (async () => {
      if (file) {
        setDataUri(await blobToDataUrl(file));
      }
    })().then();
  }, [file]);
  
  /**
   * capture : In mobile web, a property that can be used to open the camera when the user clicks the file button
   * If you specify a specific extension for accept, the capture property doesn't work.
   */
  return (
      <Wrap>
        <input style={{width: 100, height: 100, backgroundColor: 'red'}} type="file" onChange={onChange} accept=".jpg,.jpeg,.gif,.png,.bmp" capture="environment"/>
        <input style={{width: 100, height: 100, backgroundColor: 'red'}} type="file" onChange={onChange} accept="image/*" capture/>
        {file &&
            <img src={dataUri} alt="user select image"/>
        }
      </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
