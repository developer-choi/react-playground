import React, {useCallback} from 'react';
import Modal, {ModalProp} from '@component/molecules/modal/Modal';
import Button from '@component/atom/element/Button';
import styled from 'styled-components';
import {RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import type {FieldError} from 'react-hook-form/dist/types/errors';
import {useDispatchOpenModal} from '@store/reducers/modal';
// import {baseHandleErrors} from '@util/extend/react-hook-form';

/**
 * http://localhost:3000/study/rhf/register/unregister
 *
 * 버그 재현방법
 * 1. 위 URL로 접속
 * 2. Click Me 버튼 클릭해서 모달 띄우기
 * 3. Select Box를 눌러서 complicated로 바꾸기
 * 4. 곧바로 Submit 해보기.
 * (1) 처음에는 firstContent 문제있다고 얼럿뜨면서 firstContent에 포커스가 가지만,
 * (2) firstContent에 값을 입력하고나서 (= text, secondContent, thirdContent는 여전히 비워진 상태에서)
 * (3) Submit 해보면 얼럿메시지는 "text 입력하샘" 뜨는데 정작 포커스는 secondContent로 가는 버그가 있음.
 *
 * 버그 해결방법
 * 1. import { baseHandleErrors } 주석을 해제하고,
 * 1. shouldFocusError: false 주석을 해제하고,
 * 2. legacyBaseHandleErrors(...) 코드라인 주석하고
 * 3. baseHandleErrors(...) 코드라인 주석을 해제하면됨.
 */
export default function Page() {
  const {openModal} = useDispatchOpenModal();
  
  const open = useCallback(() => {
    openModal({
      props: {},
      Component: InquiryModal
    })
  }, [openModal]);
  
  return (
    <Button onClick={open}>Click Me</Button>
  );
}

function InquiryModal({closeModal, ...rest}: Omit<ModalProp, 'children'>) {
  const {register, handleSubmit, watch} = useForm<InquiryFormData>({
    // shouldFocusError: false
  });

  const onError: SubmitErrorHandler<InquiryFormData> = useCallback((errors) => {
    console.log('errors', errors);
    const {firstContent, text, secondContent, thirdContent} = errors;
    legacyBaseHandleErrors([firstContent, text, secondContent, thirdContent]);
    // baseHandleErrors([firstContent, text, secondContent, thirdContent], true);
  }, []);

  const onSubmit: SubmitHandler<InquiryFormData> = useCallback(data => {
    console.log('submit', data);
    closeModal();
  }, [closeModal]);

  const visibleInput = watch('type') === 'complicated';

  return (
    <Modal closeModal={closeModal} {...rest}>
      <Wrap onSubmit={handleSubmit(onSubmit, onError)}>
        <StyledTextArea {...register('firstContent', FIRST_TEXT_AREA_OPTIONS)}/>
        <select {...register('type')}>
          {INQUIRY_TYPES.map(({value, name}) => (
            <option key={value} value={value}>{name}</option>
          ))}
        </select>
        {!visibleInput ? null : <StyledInput {...register('text', INPUT_OPTIONS)}/>}
        <StyledTextArea {...register('secondContent', SECOND_TEXT_AREA_OPTIONS)}/>
        <StyledTextArea {...register('thirdContent', THIRD_TEXT_AREA_OPTIONS)}/>
        <Button>Submit</Button>
        <Button type="button" className="gray" onClick={closeModal}>Close</Button>
      </Wrap>
    </Modal>
  );
}

type InquiryType = 'simple' | 'complicated';

interface InquiryFormData {
  type: InquiryType;
  text: string;
  firstContent: string;
  secondContent: string;
  thirdContent: string;
}

function getOptions(name: keyof InquiryFormData): RegisterOptions {
  return {
    required: {
      value: true,
      message: `${name}값은 필수입니다.`
    }
  };
}

const INPUT_OPTIONS = getOptions('text');
const FIRST_TEXT_AREA_OPTIONS = getOptions('firstContent');
const SECOND_TEXT_AREA_OPTIONS = getOptions('secondContent');
const THIRD_TEXT_AREA_OPTIONS = getOptions('thirdContent');

const INQUIRY_TYPES: {name: string, value: InquiryType;}[] = [
  {name: 'simple', value: 'simple'},
  {name: 'complicated', value: 'complicated'}
];

function legacyBaseHandleErrors<T>(errorList: (FieldError | undefined)[]) {
  for (let error of errorList) {
    if (!error) {
      continue;
    }

    const {message} = error;

    alert(message);
    break;
  }
}

const Wrap = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  
  > * {
    margin: 10px;
  }
`;

const StyledTextArea = styled.textarea`
  height: 50px;
  border: 1px solid black;
`;

const StyledInput = styled.input`
  border: 1px solid black;
`;
