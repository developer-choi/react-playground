import React, {useState} from 'react';
import BasicCheckBox from '@components/basic/BasicCheckBox';

export default function Page() {
  
  const [someValue, setSomeValue] = useState(true);
  
  console.log(someValue);
  
  return (
      <BasicCheckBox checked={someValue} onChangeChecked={setSomeValue}/>
  );
}
