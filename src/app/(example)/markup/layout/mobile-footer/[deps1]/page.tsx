'use client';

import React, {useEffect} from 'react';
import {H1} from '@/components/element/typography';
import layoutStyles from '@/styles/layout.module.scss';
import designSystemStyles from '@/styles/design-system.module.scss';
import {PageServerComponentProps} from '@/types/declaration/next';
import {useOpenModal} from '@/utils/extend/modal';

// URL: http://localhost:3000/markup/layout/mobile-footer/product
// Doc: https://docs.google.com/document/d/1FmklHJmf9oTMpfqTxHReefj8iSXqphABXP1yoq2nh8M/edit#heading=h.7wqddqz571pa
export default function Page({params}: PageServerComponentProps) {
  const {openAlertModal} = useOpenModal();

  useEffect(() => {
    openAlertModal({
      title: 'Title',
      content: 'Content',
    });
  }, [openAlertModal]);
  
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
