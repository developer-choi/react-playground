import React, {createContext, ReactElement} from 'react';

export interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactElement[];
}

export default function RadioGroup({name, value, onChange, children}: RadioGroupProps) {
  
  return (
      <RadioGroupContext.Provider value={{name, onChange, value}}>
        {children}
      </RadioGroupContext.Provider>
  );
};

export const RadioGroupContext = createContext<RadioGroupContextValue>(undefined as any);
export type RadioGroupContextValue = Omit<RadioGroupProps, 'children'>;
