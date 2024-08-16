'use client';

import {useForm} from 'react-hook-form';
import React from 'react';
import styles from './index.module.scss';
import {filterPropsList, generatePropsList} from '@/utils/extend/test/generate-prop';
import Button, {ButtonColor, ButtonSize, ButtonVariant} from '@/components/element/Button';
import DesignSystemTestForm from '@/components/test/DesignSystemTestForm';
import InfoSvg from '@/components/icon/InfoSvg';

/**
 * Doc : https://docs.google.com/document/d/1aEHPwWUlT8nLpzuJwogzQerYawVbWIk8WCMRaxleDaI/edit
 * URL: http://localhost:3000/design-system/button
 */
const {combinations, filterRecord} = generatePropsList<ButtonProps>({
  disabled: 'boolean', // boolean이면 [true, false] 하지말고 이렇게. 하면 이따 filterRecord에서도 type checkbox로 옴
  loading: 'boolean',
  color: ['all', undefined, 'primary', 'secondary'],
  size: ['all', undefined, 'large', 'medium'],
  variant: ['all', undefined, 'outlined', 'contained'],
  icon: 'boolean',
});

export default function ButtonPage() {
  const {register, watch} = useForm<FormData>({
    defaultValues: {
      color: 'all',
      variant: 'all',
      size: 'all',

      // checkbox type은 그대로 기본값 false 써도됨. 'true' 이런거 안해도됨.
      loading: false,
      disabled: false,
      visibleInfo: false,
    },
  });

  const filter = watch();
  const filteredList = filterPropsList(combinations, filter);

  return (
    <DesignSystemTestForm filterRecord={filterRecord} register={register}>
      <div className={styles.wrap}>
        {filteredList.map((props, index) => (
          <ButtonInfo key={index} visibleInfo={filter.visibleInfo} props={props}/>
        ))}
      </div>
    </DesignSystemTestForm>
  );
}

interface FormData {
  variant: ButtonVariant | 'all' | undefined;
  size: ButtonSize | 'all' | undefined;
  color: ButtonColor | 'all' | undefined;
  disabled: boolean;
  loading: boolean;
  visibleInfo: boolean;
  icon: boolean;
}

interface ButtonInfoProps {
  visibleInfo: boolean;
  props: ButtonProps;
}

function ButtonInfo({visibleInfo, props}: ButtonInfoProps) {
  const {icon, ...rest} = props;

  return (
    <div>
      <Button {...rest}>{icon ? <InfoSvg/> : ''} Click Me</Button>
      {!visibleInfo ? null : (
        <ul>
          {Object.entries(props).map(([key, value]) => (
            <li key={key}>
              {key} = {String(value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface ButtonProps {
  variant: ButtonVariant | undefined;
  size: ButtonSize | undefined;
  color: ButtonColor | undefined;
  disabled: boolean;
  loading: boolean;
  icon: boolean;
}
