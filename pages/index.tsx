import React from 'react';
import InputFile from '@components/extend/InputFile';
import {loadVideoMetadata} from '../src/utils/extend/video';

export default function Page() {
  const [file, setFile] = React.useState<File>();
  
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
  
  return (
      <div>
        <InputFile onChangeFile={setFile}/>
      </div>
  );
}
