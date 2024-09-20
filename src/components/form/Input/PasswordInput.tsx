import Input, {InputProps} from '@/components/form/Input';
import React, {ForwardedRef, forwardRef, useCallback, useState} from 'react';
import EyeOnIcon from '@/components/icon/EyeOnIcon';
import EyeOffIcon from '@/components/icon/EyeOffIcon';

export type PasswordInputProps = Omit<InputProps, "type" | "rightRender">;

export default forwardRef(function PasswordInput(props: PasswordInputProps, ref: ForwardedRef<HTMLInputElement>) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const showPassword = useCallback(() => {
      setIsPasswordVisible(true);
    }, []);

    const hidePassword = useCallback(() => {
      setIsPasswordVisible(false);
    }, []);

    const fill = props.disabled ? 'lightgray' : 'gray';

    const eyeIcon = isPasswordVisible ? <EyeOffIcon fill={fill} onClick={hidePassword} /> : <EyeOnIcon fill={fill} onClick={showPassword} />;

    return <Input ref={ref} type={isPasswordVisible ? "text" : "password"} rightRender={eyeIcon} {...props} />;
  }
)