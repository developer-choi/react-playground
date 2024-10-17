import styles from './index.module.scss';
import {ComponentPropsWithoutRef} from 'react';
import classNames from 'classnames';

export function CenterRowBox({className, ...rest}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={classNames(styles.box, className)} {...rest}/>
  );
}
