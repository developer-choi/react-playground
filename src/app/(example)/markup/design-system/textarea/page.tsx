'use client';

import {useForm} from 'react-hook-form';
import React, {useState} from 'react';
import TextArea from '@/components/form/TextArea';
import styles from './index.module.scss';
import {filterPropsList, generatePropsList} from '@/utils/extend/random/generate-prop';

/**
 * Doc : https://docs.google.com/document/d/1l3CZHTA4ja1ovUC0fiZ9-Fb72_PMXdLTx_0gNhZ39Jg/edit
 * URL: http://localhost:3000/markup/design-system/textarea
 */
const {combinations, filterRecord} = generatePropsList<TextAreaProps>({
  disabled: 'boolean',
  error: [undefined, 'error text'],
  label: [undefined, 'label text'],
  placeholder: [undefined, 'placeholder text'],
  info: [undefined, 'info text'],
  // eslint-disable-next-line
  //@ts-ignore
  rows: [undefined, '2', '4']
});

export default function TextAreaPage() {
  const {register, watch} = useForm<TestFormData>({
    defaultValues: {
      disabled: false,
      placeholder: '',
      info: '',
      label: '',
      error: '',
      rows: ''
    }
  });

  const filteredList = filterPropsList(combinations, watch());

  return (
    <div className={styles.wrap}>
      <form>
        {Object.entries(filterRecord).map(([key, array]) => (
          <div key={key}>
            {array.map(({name, value, type}) => (
              <label key={name}>
                <input type={type} value={value} {...register(key as keyof TextAreaProps)} />
                {name}
              </label>
            ))}
          </div>
        ))}
      </form>

      <div className={styles.textAreaList}>
        {filteredList.map((props, index) => (
          <TextAreaTester key={index} {...props} />
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
  disabled: boolean;
  rows: 2 | 4 | '';
}

interface TextAreaProps {
  disabled: boolean;
  placeholder: string | undefined;
  label: string | undefined;
  error: string | undefined;
  info: string | undefined;
  rows: 2 | 4 | undefined;
}

function TextAreaTester(props: TextAreaProps) {
  const [value, setValue] = useState('');

  return <TextArea {...props} value={value} onChange={(event) => setValue(event.target.value)}/>;
}
