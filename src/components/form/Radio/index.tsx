import React, {ForwardedRef, forwardRef, PropsWithChildren} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import RadioIcon from '@/components/icon/RadioIcon';
import {CheckboxProps} from '@/components/form/Checkbox';
import {FormElementWrapper, FormElementWrapperProps} from '@/components/form/form-elements';

// https://docs.google.com/document/d/1rqmOi11-M61mjOkk5i63SigHNN8BJYLpka8c73tSLb0/edit?usp=drivesdk
export default forwardRef(function Radio<T extends string>(props: CheckboxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  const {label, color = 'primary', style, ...rest} = props;

  return (
    <label style={style} className={classNames(styles.wrapper, styles[color])}>
      <RadioIcon/>
      <input ref={ref} type="radio" {...rest} />
      {label}
    </label>
  );
});

export function RadioGroup(props: PropsWithChildren<FormElementWrapperProps>) {
  const { children, ...rest } = props;

  return (
    <FormElementWrapper {...rest}>
      <div className={styles.radioGroup}>{children}</div>
    </FormElementWrapper>
  );
}
