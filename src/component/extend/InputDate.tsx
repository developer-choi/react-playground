import React, {ChangeEvent, ComponentPropsWithoutRef, forwardRef, Ref, useCallback} from "react";
import {destructDate} from "@util/extend/date/date-convert";

export interface InputDateProp extends Omit<ComponentPropsWithoutRef<"input">, "type" | "value"> {
  value: Date;
  onChangeDate: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default forwardRef(function InputDate({onChangeDate, value, maxDate, minDate, ...rest}: InputDateProp, ref: Ref<HTMLInputElement>) {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeDate(new Date(event.target.value));
    },
    [onChangeDate]
  );

  const max = maxDate ? format(maxDate) : undefined;
  const min = minDate ? format(minDate) : undefined;

  return <input ref={ref} type="date" value={format(value)} onChange={onChange} max={max} min={min} {...rest} />;
});

function format(value: Date) {
  const {year, month, date} = destructDate(value);
  return `${year}-${datePadZero(month + 1)}-${datePadZero(date)}`;
}

function datePadZero(value: number) {
  return value.toString().padStart(2, "0");
}
