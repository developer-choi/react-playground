'use client';

import {FieldErrors, SubmitErrorHandler, SubmitHandler, useFieldArray, useForm, UseFormRegister} from 'react-hook-form';
import React, {useCallback} from 'react';
import Input from '@/components/form/Input';
import Radio, {RadioGroup} from '@/components/form/Radio';
import Button from '@/components/element/Button';
import designSystemStyles from '@/styles/design-system.module.scss';
import classNames from 'classnames';

/**
 * URL: http://localhost:3000/staging/form/condition/required
 * Doc: https://docs.google.com/document/d/1AZ0lzPYG-m-BuQ-EVXaloZ5JDKj28cDK8vUpt9LG-V0/edit?tab=t.0#heading=h.ylvvpqoeiqfq
 *
 * 테스트 방법 > 그냥 제출버튼 누르면 됨. 셋팅 다 해놨음.
 *
 * 테스트 환경)
 * step1의 1번째 항목만 입력 안시켜놓고
 * step2 보는 상태로
 * 제출을 하면
 * step1 선택되면서
 * 문제가 되는 항목으로 포커스가 이동됨.
 */
export default function Page() {
  const {control, register, handleSubmit, watch, setValue, formState: {errors}} = useForm<TestFormData>({
    defaultValues: {
      selectedStep: 'step2',
      step1: [
        {
          title: '',
          content: ''
        },
        {
          title: '222',
          content: '222'
        },
      ],
      step2: [
        {
          title: 'aaa',
          content: 'aaa'
        }
      ]
    }
  });

  const step1 = useFieldArray({
    control,
    name: 'step1',
    rules: {
      required: 'step1은 필수입니다.'
    }
  });

  const step2 = useFieldArray({
    control,
    name: 'step2',
    rules: {
      required: 'step2은 필수입니다.'
    }
  });

  const selectedStep = watch('selectedStep');

  const onSubmit: SubmitHandler<TestFormData> = useCallback(async (data) => {
    console.log('data', data);
  }, []);

  const onError: SubmitErrorHandler<TestFormData> = useCallback(({step1}) => {
    if (step1) {
      setValue('selectedStep', 'step1');
    } else {
      setValue('selectedStep', 'step2');
    }
  }, [setValue]);

  return (
    <>
      <form style={{padding: 16, maxHeight: 500, overflow: 'auto'}} className={designSystemStyles.commonForm}>
        <div style={{height: 500, backgroundColor: 'red', flexShrink: 0}}/>
        <RadioGroup label="Step 선택">
          {STEP_LIST.map(step => (
            <Radio key={step.value} value={step.value} label={step.label}  {...register('selectedStep')}/>
          ))}
        </RadioGroup>
        {step1.fields.map((field, index) => (
          <SubForm key={field.id} errors={errors} selectedStep={selectedStep} step="step1" index={index} register={register}/>
        ))}
        {step2.fields.map((field, index) => (
          <SubForm key={field.id} errors={errors} selectedStep={selectedStep} step="step2" index={index} register={register}/>
        ))}
        {selectedStep === 'step1' ? (
          <Button type="button" onClick={() => step1.append({title: '', content: ''})}>Step1 추가</Button>
        ) : (
          <Button type="button" onClick={() => step2.append({title: '', content: ''})}>Step2 추가</Button>
        )}
      </form>
      <Button isSubmit onClick={handleSubmit(onSubmit, onError)}>제출</Button>
    </>
  );
}

interface SubFormProps {
  selectedStep: StepType;
  step: StepType;
  register: UseFormRegister<TestFormData>;
  index: number;
  errors: FieldErrors<TestFormData>;
}

function SubForm({register, selectedStep, step, index, errors}: SubFormProps) {
  const errorRecord = errors[step]?.[index];

  return (
    <fieldset style={{display: selectedStep === step ? 'flex' : 'none'}} className={classNames(designSystemStyles.commonSubForm, 'row')}>
      <Input error={errorRecord?.title?.message} placeholder="title" {...register(`${step}.${index}.title`, {required: '제목은 필수에요'})}/>
      <Input error={errorRecord?.content?.message} placeholder="content" {...register(`${step}.${index}.content`, {required: '내용은 필수에요'})}/>
    </fieldset>
  )
}

interface TestFormData {
  step1: Step[];
  step2: Step[];
  selectedStep: StepType;
}

type StepType = 'step1' | 'step2';

const STEP_LIST = [
  {
    label: 'step1',
    value: 'step1',
  },
  {
    label: 'step2',
    value: 'step2',
  },
];

interface Step {
  title: string;
  content: string;
}
