import {ReactNode, PropsWithChildren, CSSProperties} from "react";
import classNames from 'classnames';
import styles from './index.module.scss';

export interface FormElementWrapperProps {
  label?: string | ReactNode;
  error?: string;

  className?: string;
  style?: CSSProperties;
}

/**
 * input, textarea, radio-group, select 만들 때
 * label, error를 매번 각 컴포넌트에서 조건문넣어서 렌더링시키지말고
 * 그냥 wrapper 하나에서 다 시키는게 훨씬 낫고, 강제시킬 수 있음.
 *
 * 폼 요소별로 (특히 input, textarea) 상태는 우선순위까지 결정이 필요함.
 * 네이버기준 disabled > error > focus > default임.
 */
export function FormElementWrapper({label, error, children, style, className = ''}: PropsWithChildren<FormElementWrapperProps>) {
  /**
   * 전체 폼요소 영역을 label로 감싸서, 라벨 / 에러메시지 / 테두리와 실제 폼요소 사이 간격등 어디를 클릭하더라도 폼요소로 포커스 이동하도록 하기위함.
   * <Input> 에서 단위로 points 같은거 노출된 상태에서, points 텍스트 영역을 클릭했을 때 인풋 폼요소로 포커스이동이 안되서 추가하긴 했지만, (일단 테두리 안에있긴하니까)
   * 그냥 이거로 감싸지는 모든 폼요소에 적용해도 문제는 없어보여서 이렇게 처리했음.
   */
  return (
    <label style={style} className={classNames(styles.container, className)}>
      {!label ? null : <span className={styles.label}>{label}</span>}

      {children}

      {!error ? null : <span className={styles.formErrorMessage}>{error}</span>}
    </label>
  )
}
