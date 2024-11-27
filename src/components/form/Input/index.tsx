import {FormElementWrapper, FormElementWrapperProps} from '@/components/form/form-elements';
import classNames from 'classnames';
import {ComponentPropsWithRef, forwardRef, MouseEvent, ReactNode, useCallback} from 'react';
import styles from './index.module.scss';
import {isReactElement} from '@/utils/extend/library/react';
import CheckIcon from '@/components/icon/CheckIcon';

export interface InputProps extends ComponentPropsWithRef<"input">, Omit<FormElementWrapperProps, "kind"> {
  rightRender?: ReactNode; // 주로 아이콘 (패스워드 인풋의 eye 아이콘 등) 혹은 텍스트로 된 단위 (원, 달러, 포인트 등)
  hiddenErrorMessage?: boolean; // 에러테두리는 표시하고싶은데 에러메시지는 미노출하고싶은 경우 전달 (ex: 주소폼처럼 여러개의 <Input이 셋트로 나오는 경우)
  success?: boolean; // <Input 우측에 뜨는 체크표시 아이콘
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url';
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const {label, error, rightRender, style, className, hiddenErrorMessage, disabled, success, ...rest} = props;

  /**
   * disabled일 때는, 인풋을 포함해서 테두리영역 안에있는 아이콘까지 전부다 클릭했을 때 반응이 없어야함.
   */
  const onClickCapture = useCallback((event: MouseEvent<HTMLInputElement>) => {
    if (disabled) {
      event.stopPropagation();
    }
  }, [disabled]);

  // 우측에 무엇이 렌더링 되더라도, React Element가 아니면 기본적으로 태그하나 감싸서 의도된 스타일링 (flex gap 등)이 적용될 수 있도록 하기위함
  const _rightRender = isReactElement(rightRender) ? rightRender : <span>{rightRender}</span>;

  return (
    <FormElementWrapper style={style} className={className} label={label} error={hiddenErrorMessage ? undefined : error}>
      {/* <Input은 완전 커스텀하려면 이렇게 div 한번 더 (총 2번) 감싸는게 맞음. 아이콘까지 잘 노출시키면서, 최대치로 입력했을 때 아이콘 안가리게 해야해서. */}
      <div className={classNames(styles.innerContainer, {[styles.error]: error})} onClickCapture={onClickCapture}>
        <input ref={ref} className={styles.input} disabled={disabled} {...rest} />
        {_rightRender}
        {!success ? null : <CheckIcon fill="green"/>}
      </div>
    </FormElementWrapper>
  );
});
