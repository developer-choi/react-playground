'use client';

import {useForm} from 'react-hook-form';
import React, {useState} from 'react';
import Input from '@/components/form/Input';
import styles from './index.module.scss';
import {filterPropsList, generatePropsList} from '@/utils/extend/random/generate-prop';
import PasswordInput from '@/components/form/Input/PasswordInput';

/**
 * Doc : https://docs.google.com/document/d/1l3CZHTA4ja1ovUC0fiZ9-Fb72_PMXdLTx_0gNhZ39Jg/edit
 * URL: http://localhost:3000/markup/design-system/input
 */
const {combinations, filterRecord} = generatePropsList<TextFieldProps>({
  disabled: 'boolean',
  type: [undefined, 'password'],
  error: [undefined, 'error text'],
  label: [undefined, 'label text'],
  placeholder: [undefined, 'placeholder text'],
  info: [undefined, 'info text'],
});

export default function TextFieldPage() {
  const {register, watch} = useForm<TestFormData>({
    defaultValues: {
      disabled: false,

      // 폼 기본값에서 undefined를 주면안되고 그대신 빈문자열을 줘야함. 렌더링한번되고나면 폼데이터값이 빈문자열로 리셋되기떄문.
      placeholder: '',
      info: '',
      label: '',
      error: '',
      type: '',
    },
  });

  const filteredList = filterPropsList(combinations, watch());

  return (
    <div className={styles.wrap}>
      <form>
        {Object.entries(filterRecord).map(([key, array]) => (
          <div key={key}>
            {array.map(({name, value, type}) => (
              <label key={name}>
                <input type={type} value={value} {...register(key as keyof TextFieldProps)} />
                {name}
              </label>
            ))}
          </div>
        ))}
      </form>

      <div className={styles.inputList}>
        {filteredList.map((props, index) => (
          <InputTester key={index} {...props} />
        ))}
      </div>
    </div>
  );
}

interface TestFormData {
  placeholder: string | '';
  label: string | '';
  error: string | '';
  info: string | '';
  type: 'text' | 'password' | '';
  disabled: boolean;
}

interface TextFieldProps {
  placeholder: string | undefined;
  label: string | undefined;
  error: string | undefined;
  info: string | undefined;
  type: 'text' | 'password' | undefined;
  disabled: boolean;
}

function InputTester({type, ...rest}: TextFieldProps) {
  const [value, setValue] = useState('');

  if (type === 'password') {
    return (
      <PasswordInput {...rest} value={value} onChange={(event) => setValue(event.target.value)}/>
    );
  } else {
    return <Input {...rest} value={value} onChange={(event) => setValue(event.target.value)} rightRender="Points"/>;
  }
}
