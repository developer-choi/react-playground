import React, {useState} from 'react';
import RadioGroup from '@components/atom/RadioGroup';
import RadioLabel from '@components/atom/RadioLabel';

export default function Page() {
  
  const [gender, setGender] = useState('man');
  
  return (
      <RadioGroup name="gender" value={gender} onChange={setGender}>
        <RadioLabel value="man"/>
        <RadioLabel value="women"/>
      </RadioGroup>
  );
}
