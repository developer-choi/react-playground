'use client';

import React, {ReactElement, ReactNode, useCallback} from 'react';
import styles from './page.module.scss';
import {useForm} from 'react-hook-form';
import Image from 'next/image';
import {H2} from '@/components/element/typography';
import Radio, {RadioGroup} from '@/components/form/Radio';
import Button from '@/components/element/Button';
import {ModalContainer, ModalContainerProps} from '@/components/modal/container';
import {DefaultModalHeader, ProfileModalHeader} from '@/components/modal/header';
import DefaultModalBody from '@/components/modal/body';
import {OneButtonModalFooter, TwoButtonsModalFooter} from '@/components/modal/footer';
import {useToggle} from '@/utils/extend/library/react';
import {useOpenModal} from '@/utils/extend/modal';
import designSystemStyles from '@/styles/design-system.module.scss';

// URL: http://localhost:3000/markup/design-system/modal
// Doc: https://docs.google.com/document/d/16-Z3RmslEMvhfwOMmePYTRg4HkUjKjWSxxF2SB7NGGU/edit
export default function DesignSystemTest() {
  return (
    <div className={styles.wrap}>
      <ClassifyModalTest />
      <CompositionModalTest />
      <OthersModalTest />
      <FullCustomTest/>
    </div>
  );
}

function ClassifyModalTest() {
  const { register, watch, handleSubmit } = useForm<ModalFormData>({
    defaultValues: {
      type: 'bottomSheet',
      title: 'short',
      content: 'short',
      size: 'medium',
    },
  });
  const { bool: visible, setFalse: closeModal, setTrue: openModal } = useToggle();

  const formData = watch();

  return (
    <>
      <H2>모달 분류 속성 테스트</H2>
      <form className={designSystemStyles.commonForm} onSubmit={handleSubmit(openModal)}>
        <RadioGroup label="컨테이너">
          <Radio label="기본" value="centerAlign" {...register('type')} />
          <Radio label="바텀" value="bottomSheet" {...register('type')} />
          <Radio label="풀" value="fullScreen" {...register('type')} />
        </RadioGroup>
        {formData.type !== 'centerAlign' ? null : (
          <RadioGroup label="모달 사이즈">
            <Radio label="Medium" value="medium" {...register('size')} />
            <Radio label="Large" value="large" {...register('size')} />
          </RadioGroup>
        )}
        <RadioGroup label="모달제목">
          <Radio label="짧은 제목" value="short" {...register('title')} />
          <Radio label="긴 제목" value="long" {...register('title')} />
        </RadioGroup>
        <RadioGroup label="모달내용">
          <Radio label="짧은 내용" value="short" {...register('content')} />
          <Radio label="긴 내용" value="long" {...register('content')} />
        </RadioGroup>
        <Button type="submit">모달 띄우기</Button>
      </form>

      {/* 나중에 완성품을 만든다면 이렇게 container header body footer를 조합하면됨. */}
      <ModalContainer
        type={formData.type}
        open={visible}
        onClose={closeModal}
        size={formData.size}
      >
        <DefaultModalHeader onClose={closeModal}>
          {LOREM_IPSUM.slice(0, formData.title === 'short' ? 6 : 50)}
        </DefaultModalHeader>
        <DefaultModalBody>
          {LOREM_IPSUM.repeat(formData.content === 'short' ? 1 : repeatBySize[formData.size ?? 'medium'])}
        </DefaultModalBody>
        <OneButtonModalFooter onClick={closeModal} buttonText="Confirm" />
      </ModalContainer>
    </>
  );
}

const repeatBySize: Record<'large' | 'medium', number> = {
  medium: 8,
  large: 10,
};

interface ModalFormData {
  type: ModalContainerProps['type'];
  size: ModalContainerProps['size'];
  title: 'long' | 'short';
  content: 'long' | 'short';
}

const LOREM_IPSUM =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

function CompositionModalTest() {
  const { register, watch, handleSubmit } = useForm<CompositionFormData>({
    defaultValues: {
      type: 'centerAlign',
      size: 'medium',
      body: 'text',
      header: 'exclude-close',
      footer: 'one-button',
    },
  });

  const { bool: visible, setFalse: closeModal, setTrue: openModal } = useToggle();

  const formData = watch();

  const headerRecord: Record<CompositionFormData['header'], ReactElement> = {
    'exclude-close': <DefaultModalHeader>{LOREM_IPSUM.slice(0, 6)}</DefaultModalHeader>,
    'include-close': <DefaultModalHeader onClose={closeModal}>{LOREM_IPSUM.slice(0, 6)}</DefaultModalHeader>,
    profile: (
      <ProfileModalHeader
        profileImage="https://storage.langdy.net/uploads/user/profile_pic/108424/pic_2.jpg"
        teacherName="Rose"
        hashtags={['#TEFL', '#밝음', '#독서', '#드라마']}
      />
    ),
  };

  const bodyRecord: Record<CompositionFormData['body'], ReactNode> = {
    text: LOREM_IPSUM.repeat(repeatBySize[formData.size ?? 'medium']),
    image: <Image width={300} height={300} src="https://picsum.photos/300/300" alt="프로모션 배너이미지" />,
  };

  const footerRecord: Record<CompositionFormData['footer'], ReactNode> = {
    'one-button': <OneButtonModalFooter onClick={closeModal} buttonText="Confirm" />,
    'two-buttons': (
      <TwoButtonsModalFooter
        left={{ onClick: closeModal, buttonText: '오늘은 그만보기' }}
        right={{ onClick: closeModal, buttonText: '바로가기' }}
      />
    ),
  };

  return (
    <>
      <H2>모달 조합 테스트</H2>
      <form className={designSystemStyles.commonForm} onSubmit={handleSubmit(openModal)}>
        <RadioGroup label="컨테이너">
          <Radio label="기본" value="centerAlign" {...register('type')} />
          <Radio label="바텀" value="bottomSheet" {...register('type')} />
          <Radio label="풀" value="fullScreen" {...register('type')} />
        </RadioGroup>
        {formData.type !== 'centerAlign' ? null : (
          <RadioGroup label="모달 사이즈">
            <Radio label="Medium" value="medium" {...register('size')} />
            <Radio label="Large" value="large" {...register('size')} />
          </RadioGroup>
        )}
        <RadioGroup label="헤더 조합 종류">
          <Radio label="X 없음" value="exclude-close" {...register('header')} />
          <Radio label="X 있음" value="include-close" {...register('header')} />
          <Radio label="(번외) 프로필" value="profile" {...register('header')} />
        </RadioGroup>
        <RadioGroup label="바디 조합 종류">
          <Radio label="텍스트" value="text" {...register('body')} />
          <Radio label="이미지" value="image" {...register('body')} />
        </RadioGroup>
        <RadioGroup label="푸터 조합 종류">
          <Radio label="버튼 1개" value="one-button" {...register('footer')} />
          <Radio label="버튼 2개" value="two-buttons" {...register('footer')} />
        </RadioGroup>
        <Button type="submit">모달 띄우기</Button>
      </form>

      <ModalContainer
        type={formData.type}
        open={visible}
        onClose={closeModal}
        size={formData.size}
      >
        {headerRecord[formData.header]}
        <DefaultModalBody style={{ display: formData.body === 'image' ? 'flex' : 'block' }}>
          {bodyRecord[formData.body]}
        </DefaultModalBody>
        {footerRecord[formData.footer]}
      </ModalContainer>
    </>
  );
}

function OthersModalTest() {
  const {openAlertModal} = useOpenModal();

  const alert = useCallback(() => {
    openAlertModal({
      title: 'Alert (완성품) 모달은',
      content: 'X버튼없고, 스몰사이즈 중앙정렬 컨테이너에 버튼 1개짜리 조합입니다.',
    });
  }, [openAlertModal]);

  const promotion = useToggle();

  return (
    <>
      <H2>그 외 모달 테스트</H2>
      <div className={designSystemStyles.commonForm}>
        <Button onClick={alert}>Alert (완성품)</Button>
        <Button onClick={promotion.setTrue}>프로모션</Button>
      </div>
      {!promotion.bool ? null : (
        <ModalContainer
          type="centerAlign"
          open
          onClose={promotion.setFalse}
          size="medium"
        >
          <DefaultModalBody>
            <Image width={300} height={300} src="https://picsum.photos/300/300" alt="프로모션 배너이미지" />
          </DefaultModalBody>
          <TwoButtonsModalFooter
            left={{ onClick: promotion.setFalse, buttonText: '오늘은 그만보기' }}
            right={{ onClick: promotion.setFalse, buttonText: '바로가기' }}
          />
        </ModalContainer>
      )}
    </>
  );
}

// 헤더 바디 푸터 규칙 아예 안지키고 완전 풀커스텀 하는 예시
function FullCustomTest() {
  const {bool: visible, setTrue, setFalse: onClose} = useToggle();

  return (
    <>
      <H2>헤더 바디 푸터 규칙 아예 안지키고 완전 풀커스텀 하는 예시</H2>
      <Button onClick={setTrue}>Click Me</Button>

      {!visible ? null : (
        <ModalContainer onClose={onClose} easilyClose>
          Hello World
        </ModalContainer>
      )}
    </>
  )
}

interface CompositionFormData {
  type: ModalContainerProps['type'];
  size: ModalContainerProps['size'];
  header: 'include-close' | 'exclude-close' | 'profile';
  body: 'image' | 'text';
  footer: 'one-button' | 'two-buttons';
}
