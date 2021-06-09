import React, {useState} from 'react';
import InputFileExtend, {ImageWrapper, InputFileExtendProp} from '@components/extend/InputFileExtend';

export default function Page() {
  
  const [datas, setDatas] = useState<ImageWrapper[]>([]);
  
  return (
      <div>
        <InputFileExtend onChangeImages={setDatas} maxSize={MAX_SIZE} allowExtensions={ALLOW_EXTENSIONS} multiple/>
        {datas.map(({file, image}) => (
            <img key={file.name} src={image.src} alt={image.alt}/>
        ))}
      </div>
  );
}

const ALLOW_EXTENSIONS = ['jpg', 'png'];
const MAX_SIZE: InputFileExtendProp['maxSize'] = {value: 10, unit: 'MB'};
