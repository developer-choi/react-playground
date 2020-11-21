import React, {ChangeEvent, ComponentProps, useCallback} from 'react';

export interface SelectExtendProp<T extends string> extends Omit<ComponentProps<'select'>, 'ref'> {
  onChangeText?: (value: T) => void;
  value: T;
  items: { label: string; value: T; }[];
}

export default function SelectExtend<T extends string>({items, onChange, onChangeText, ...rest}: SelectExtendProp<T>) {

  const _onChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const {value} = event.target;
    //@ts-ignore items로 value type을 강제했으므로 타입무시
    onChangeText?.(value);
    onChange?.(event);
  }, [onChange, onChangeText]);

  return (
      <select onChange={_onChange} {...rest}>
        {items.map(({value, label}) => (
            <option key={`${label}-${value}`} value={value}>{label}</option>
        ))}
      </select>
  );
}
