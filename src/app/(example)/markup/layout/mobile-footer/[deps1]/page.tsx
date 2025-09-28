'use client';

import React, {useEffect} from 'react';
import {H1} from '@/components/element/typography';
import layoutStyles from '@/styles/layout.module.scss';
import designSystemStyles from '@forworkchoe/core/design-system.module.scss';
import {PageServerComponentProps} from '@forworkchoe/core/utils';
import {useModal} from '@forworkchoe/core/hooks';

// URL: http://localhost:3000/markup/layout/mobile-footer/product
// Doc: https://docs.google.com/document/d/1FmklHJmf9oTMpfqTxHReefj8iSXqphABXP1yoq2nh8M/edit#heading=h.7wqddqz571pa
export default function Page({params}: PageServerComponentProps) {
  const {open} = useModal();

  useEffect(() => {
    open.alert({
      title: 'Title',
      content: 'Content',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open.alert]);
  
  return (
    <div className={layoutStyles.mobilePageContent}>
      <H1 style={{textTransform: 'capitalize'}}>{params.deps1}</H1>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}/>
      <div className={designSystemStyles.rowBox}>
        마지막 박스까지 잘 보이는지 체크!
      </div>
    </div>
  );
}
