'use client';

import {useForm} from 'react-hook-form';
import React from 'react';
import styles from './index.module.scss';
import {filterPropsList, generatePropsList} from '@/utils/extend/test/generate-prop';
import {ButtonColor, ButtonLink, ButtonSize, ButtonVariant} from '@/components/element/Button';
import DesignSystemTestForm from '@/components/test/DesignSystemTestForm';
import InfoIcon from '@/components/icon/InfoIcon';

/**
 * URL: http://localhost:3000/markup/design-system/button-anchor
 * Doc : https://docs.google.com/document/d/1aEHPwWUlT8nLpzuJwogzQerYawVbWIk8WCMRaxleDaI/edit
 */
const {combinations, filterRecord} = generatePropsList<ButtonProps>({
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
      visibleInfo: false,
    },
  });

  const filter = watch();
  const filteredList = filterPropsList(combinations, filter);

  return (
    <DesignSystemTestForm register={register} filterRecord={filterRecord}>
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
      <ButtonLink href="" {...rest}>{icon ? <InfoIcon/> : ''} Click Me</ButtonLink>
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
  icon: boolean;
}
