import TextAreaExtend from '@components/extend/TextAreaExtend';
import React, {useCallback, useState} from 'react';

export default function Page() {
  const [content, setContent] = useState('');
  
  const onCtrlEnter = useCallback(() => {
    alert('submit');
  }, []);
  
  return (
      <div>
        <TextAreaExtend value={content} onChangeText={setContent} onCtrlEnter={onCtrlEnter}/>
      </div>
  );
}
