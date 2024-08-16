import React, {PropsWithChildren} from 'react';
import styles from './index.module.scss';
import {UseFormRegister} from 'react-hook-form';
import {H2} from '@/components/element/typography';

export interface DesignSystemTestFormProps extends PropsWithChildren {
  register: UseFormRegister<any>;
  filterRecord: Record<string, {
    type: string;
    name: string;
    value: any;
  }[]>;
}

export default function DesignSystemTestForm({children, register, filterRecord}: DesignSystemTestFormProps) {
  return (
    <div className={styles.wrap}>
      <H2>필터</H2>
      <form>
        {Object.entries(filterRecord).map(([key, array]) => (
          <div key={key}>
            {array.map(({name, value, type}) => (
              <label key={name}>
                <input type={type} value={value} {...register(key)} />
                {name}
              </label>
            ))}
          </div>
        ))}

        <div>
          <label>
            <input type="checkbox" {...register('visibleInfo')} />
            버튼 속성 보기
          </label>
        </div>
      </form>
      <H2 style={{marginTop: 60}}>버튼</H2>
      {children}
    </div>
  )
}
