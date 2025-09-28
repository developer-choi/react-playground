'use client';

import {FieldErrors, SubmitErrorHandler, SubmitHandler, useFieldArray, useForm, UseFormRegister} from 'react-hook-form';
import React, {useCallback} from 'react';
import Input from '@/components/form/Input';
import Radio, {RadioGroup} from '@/components/form/Radio';
import {Button} from '@forworkchoe/core/components';
import designSystemStyles from '@forworkchoe/core/design-system.module.scss';
import classNames from 'classnames';
import {useMutation} from '@tanstack/react-query';
import {timeoutPromise} from '@forworkchoe/core/utils';

/**
 * URL: http://localhost:3000/staging/form/condition/required
 * Doc: https://docs.google.com/document/d/1AZ0lzPYG-m-BuQ-EVXaloZ5JDKj28cDK8vUpt9LG-V0/edit?tab=t.0#heading=h.ylvvpqoeiqfq
 *
 * 테스트 방법 1. Client Side에서 체크하는 케이스
 * (1) defaultValues중에 아무거나 빈문자열로 셋팅하고,
 * (2) 그 빈문자열이 셋팅된 step과 반대의 step을 선택한 후 제출 눌렀을 때
 * (3) 빈문자열이 있는 step으로 바뀌고 & 문제가 되는 인풋으로 포커스 이동 & 스크롤 이동 & 에러메시지 표시가 되는지 확인.
 *
 * 테스트 방법 2. API에서 체크 후 특정 인풋에 문제가 있다고 응답되는 경우
 * (1) 그냥 바로 제출 누르면 됨. 이에 맞게 기본값 미리 다 defaultValues에 셋팅해놨음.
 */
export default function Page() {
  const {control, register, handleSubmit, watch, setValue, setError, formState: {errors}} = useForm<TestFormData>({
    defaultValues: {
      selectedStep: 'step2',
      step1: [
        {
          title: '111',
          content: '222'
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

  const {mutateAsync, isPending} = useMutation({
    mutationFn: updateApi
  });
  const onSubmit: SubmitHandler<TestFormData> = useCallback(async (data) => {
    console.log('data', data);

    try {
      await mutateAsync(data);
    } catch (error) {
      const {stepType, index, dataType} = error as ErrorResponse;
      setValue('selectedStep', stepType);

      setTimeout(() => {
        setError(`${stepType}.${index}.${dataType}`, {
          type: 'api',
          message: `${stepType} ${dataType}을 이렇게 적으면 안되요`
        }, {
          shouldFocus: true
        });
      });
    }
  }, [mutateAsync, setError, setValue]);

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
      <Button isSubmit loading={isPending} onClick={handleSubmit(onSubmit, onError)}>제출</Button>
    </>
  );
}

interface ErrorResponse {
  stepType: StepType;
  dataType: 'title' | 'content';
  index: number;
}

async function updateApi(_: TestFormData) {
  await timeoutPromise(1000);

  const response: ErrorResponse = {
    stepType: 'step1',
    dataType: 'title',
    index: 0
  };

  return Promise.reject(response);
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
