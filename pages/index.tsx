import React, {useState} from 'react';
import RadioGroup from '@components/atom/RadioGroup';
import Radio from '@components/atom/Radio';

export default function Page() {
  
  const [gender, setGender] = useState('man');
  
  return (
      <RadioGroup name="gender" value={gender} onChange={setGender}>
        <Radio value="man"/>
        <Radio value="women"/>
      </RadioGroup>
  );
}
