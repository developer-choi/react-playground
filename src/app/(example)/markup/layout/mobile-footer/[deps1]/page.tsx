import React from 'react';
import {H1} from '@/components/element/typography';
import layoutStyles from '@/styles/layout.module.scss';
import {ServerComponentProps} from '@/types/declaration/next';

// URL: http://localhost:3000/markup/layout/mobile-footer/product
// Doc: https://docs.google.com/document/d/1FmklHJmf9oTMpfqTxHReefj8iSXqphABXP1yoq2nh8M/edit#heading=h.7wqddqz571pa
export default function Page({params}: ServerComponentProps) {
  return (
    <div className={layoutStyles.mobilePageContent}>
      <H1 style={{textTransform: 'capitalize'}}>{params.deps1}</H1>
    </div>
  );
}
