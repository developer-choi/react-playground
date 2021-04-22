import React, {useCallback, useState} from 'react';
import MainLayout from '../src/components/layouts/MainLayout';
import InputNumber from '@components/extend/InputNumber';

export default function Page() {
  const [value, setValue] = useState('');
  const onChangeText = useCallback((value: string) => {
    setValue(value);
  }, []);
  console.log(value);
  return (
      <MainLayout>
        <InputNumber value={value} onChangeText={onChangeText}/>
      </MainLayout>
  );
};
