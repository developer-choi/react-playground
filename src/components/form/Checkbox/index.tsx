import React, {ComponentPropsWithRef, ForwardedRef, forwardRef} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import CheckIcon from '@/components/icon/CheckIcon';
import UncheckIcon from '@/components/icon/UncheckIcon';

// https://docs.google.com/document/d/1rqmOi11-M61mjOkk5i63SigHNN8BJYLpka8c73tSLb0/edit?usp=drivesdk
export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label?: string;
  color?: 'primary' | 'secondary';
}

export default forwardRef(function Checkbox(props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) {
  const { style, className, label, color = 'primary', ...rest } = props;

  return (
    <label style={style} className={classNames(styles.wrapper, styles[color], className)}>
      <CheckIcon className={styles.checked}/>
      <UncheckIcon className={styles.unchecked}/>
      <input ref={ref} type="checkbox" {...rest} />
      {label}
    </label>
  );
});
