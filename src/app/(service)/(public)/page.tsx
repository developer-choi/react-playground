'use client';

import Radio, {RadioGroup, RadioProps} from '@/components/form/Radio';
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {useCallback} from 'react';
import designSystemStyles from '@/styles/design-system.module.scss';
import Button from '@/components/element/Button';
import {baseHandleErrors} from '@/utils/extend/library/react-hook-form';

export default function Home() {
  const {galaxyTabProps, ipadProProps, onSubmit} = useGiftForm();

  return (
    <form className={designSystemStyles.commonForm} onSubmit={onSubmit}>
      <RadioGroup>
        <Radio {...galaxyTabProps}/>
        <Radio {...ipadProProps}/>
      </RadioGroup>
      <Button isSubmit>제출버튼</Button>
    </form>
  );
}

// 사은품 폼
function useGiftForm() {
  const {register, handleSubmit} = useForm<GiftFormData>();

  const ipadProProps: RadioProps<GiftType> = {
    ...register('type', {
      required: '사은품 상품 선택은 필수입니다'
    }),
    value: 'ipad-pro',
  };

  const galaxyTabProps: RadioProps<GiftType> = {
    ...register('type', {
      required: '사은품 상품 선택은 필수입니다'
    }),
    value: 'galaxy-tab',
  };

  const onError: SubmitErrorHandler<GiftFormData> = useCallback(({type}) => {
    baseHandleErrors([type]);
  }, []);

  const onSubmit: SubmitHandler<GiftFormData> = useCallback(async ({type}) => {
    alert(`선택한 상품 > ${type}`);
  }, []);

  return {
    ipadProProps,
    galaxyTabProps,
    onSubmit: handleSubmit(onSubmit, onError)
  };
}

type GiftType = 'ipad-pro' | 'galaxy-tab';

interface GiftFormData {
  type: GiftType;
}
