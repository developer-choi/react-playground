import {ComponentPropsWithoutRef, forwardRef} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

// https://www.daleseo.com/css-toggle-switch/
export interface SwitchProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
}

export default forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
  const {label, style, className, ...rest} = props;

  return (
    <label style={style} className={classNames(styles.switchLabel, className)}>
      <input ref={ref} type="checkbox" {...rest} />
      {label}
    </label>
  );
});
