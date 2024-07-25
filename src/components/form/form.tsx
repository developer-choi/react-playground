import {ComponentPropsWithoutRef} from 'react';
import styles from './form.module.scss';
import classNames from 'classnames';

export function Form({className, ...rest}: ComponentPropsWithoutRef<'form'>) {
  return (
    <form className={classNames(styles.formWrap, className)} {...rest}/>
  )
}