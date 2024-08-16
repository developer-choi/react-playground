import Input, {InputProps} from "@/components/form/Input";
import React, {useCallback, useState} from "react";
import EyeOnSvg from "@/components/icon/EyeOnSvg";
import EyeOffSvg from "@/components/icon/EyeOffSvg";

export type PasswordInputProps = Omit<InputProps, "type" | "rightRender">;

export default function PasswordInput(props: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showPassword = useCallback(() => {
    setIsPasswordVisible(true);
  }, []);

  const hidePassword = useCallback(() => {
    setIsPasswordVisible(false);
  }, []);

  const fill = props.disabled ? 'lightgray' : 'gray';

  const eyeIcon = isPasswordVisible ? <EyeOffSvg fill={fill} onClick={hidePassword} /> : <EyeOnSvg fill={fill} onClick={showPassword} />;

  return <Input type={isPasswordVisible ? "text" : "password"} rightRender={eyeIcon} {...props} />;
}
