'use client';

import designSystemStyles from '@/styles/design-system.module.scss';
import Input from '@/components/form/Input';
import {Button} from '@forworkchoe/core';
import {FormElementUnderText, Label} from '@/components/form/form-elements';
import classNames from 'classnames';

/**
 * URL: http://localhost:3000/markup/design-system/form
 * Doc: https://docs.google.com/document/d/1l3CZHTA4ja1ovUC0fiZ9-Fb72_PMXdLTx_0gNhZ39Jg/edit
 */
export default function Page() {
  return (
    <div style={{padding: 32}}>
      <form className={designSystemStyles.commonForm}>
        <Input label="이름 입력" placeholder="이름을 입력해주세요"/>
        <Input label="나이 입력" placeholder="나이를 입력해주세요"/>
        <Input label="이메일 입력" placeholder="이메일을 입력해주세요"/>

        <div>
          <Label>휴대폰 번호 입력</Label>
          <div className={classNames(designSystemStyles.commonSubForm, 'row')}>
            <Input placeholder="01012341234" error="에러메시지" hiddenErrorMessage/>
            <Button>인증번호 전송</Button>
          </div>
          <FormElementUnderText type="error">에러메시지</FormElementUnderText>
        </div>

        <div className={designSystemStyles.commonSubForm}>
          <Label>주소 입력</Label>
          <div className={classNames(designSystemStyles.commonSubForm, 'row')}>
            <Input/>
            <Button>우편번호</Button>
          </div>
          <Input/>
          <Input placeholder="상세 주소 입력" error="에러메시지" hiddenErrorMessage/>
          <FormElementUnderText type="error">에러메시지</FormElementUnderText>
        </div>
        <Button isSubmit>제출</Button>
      </form>
    </div>
  );
}
