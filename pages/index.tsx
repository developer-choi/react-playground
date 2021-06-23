import React, {useState} from 'react';
import RadioGroup from '@components/extend/RadioGroup';
import Radio from '@components/extend/Radio';

export default function Page() {
  
  const [gender, setGender] = useState('man');
  
  return (
      <RadioGroup name="gender" value={gender} onChange={setGender}>
        <Radio value="man"/>
        <Radio value="women"/>
      </RadioGroup>
  );
}
