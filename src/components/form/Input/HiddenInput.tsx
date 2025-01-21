import {ComponentPropsWithoutRef, forwardRef} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

export type HiddenInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export default forwardRef<HTMLInputElement, HiddenInputProps>(function HiddenInput({className, ...rest}, ref) {
  return (
    <input ref={ref} type="checkbox" className={classNames(styles.hiddenInput)} {...rest}/>
  );
});
