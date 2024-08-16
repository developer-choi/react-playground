import React from 'react';
import {Body1, Body2, H1, H2} from '@/components/element/typography';
import styles from './index.module.scss';

// URL: http://localhost:3000/markup/design-system/typography
export default function Page() {
  return (
    <div className={styles.wrap}>
      <H1 className={styles.customH1}>H1Text</H1>
      <H1 bold={false}>H1Text</H1>

      <H2>H2Text</H2>
      <H2 bold={false}>H2Text</H2>

      <Body1>Body1Text</Body1>
      <Body1 bold>Body1Text</Body1>

      <Body2>Body2Text</Body2>
      <Body2 bold>Body2Text</Body2>
    </div>
  );
}
