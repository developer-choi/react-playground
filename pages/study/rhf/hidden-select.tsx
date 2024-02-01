import React, {ComponentPropsWithoutRef, CSSProperties, forwardRef, Ref, useCallback} from "react";
import {useForm} from "react-hook-form";
import Button from "@component/atom/element/Button";

export default function Page() {
  const {setValue, handleSubmit, register, watch, formState} = useForm();

  const onError = useCallback((errors: any) => {
    console.error(errors);
  }, []);

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  console.log("error state", formState.errors);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <span style={{fontSize: 30}}>{watch("select")}</span>
      <div style={{width: 60, height: 20, background: "red", color: "white"}} onClick={() => setValue("select", "1")}>
        1
      </div>
      <div style={{width: 60, height: 20, background: "red", color: "white"}} onClick={() => setValue("select", "2")}>
        2
      </div>
      <div style={{width: 60, height: 20, background: "red", color: "white"}} onClick={() => setValue("select", "3")}>
        3
      </div>
      <HiddenSelect values={["1", "2", "3"]} {...register("select", {required: {value: true, message: "필수임"}})} />
      <Button type="submit">제출</Button>
    </form>
  );
}

export interface HiddenSelectProps extends Omit<ComponentPropsWithoutRef<"select">, "children"> {
  values: string[];
}

const HiddenSelect = forwardRef(function HiddenSelect({style = DEFAULT_STYLE, values, ...rest}: HiddenSelectProps, ref: Ref<HTMLSelectElement>) {
  const children = (
    <>
      <option></option>
      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </>
  );

  return (
    <select ref={ref} style={style} {...rest}>
      {children}
    </select>
  );
});

const DEFAULT_STYLE: CSSProperties = {
  width: 0,
  height: 0,
  opacity: 0
};
