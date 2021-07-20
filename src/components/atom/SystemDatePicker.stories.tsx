import React, {useState} from 'react';
import type {Story} from '@storybook/react';
import SystemDatePicker from '@components/atom/SystemDatePicker';
import type {InputDateProp} from '@components/extend/InputDate';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from '../../utils/style/theme';
import { GlobalStyle } from 'src/utils/style/global';

export default {
  component: SystemDatePicker,
  title: 'atom/SystemDatePicker'
};

const Template: Story<InputDateProp> = args => {
  
  const [date, setDate] = useState(new Date());
  
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <SystemDatePicker {...args} value={date} onChangeDate={setDate}/>
      </ThemeProvider>
  );
};

const Button = styled.button`
  background: lightcoral;
  padding: 8px 20px;
  border-radius: 5px;
  color: white;
`;

export const CustomButton = Template.bind({});
CustomButton.args = {
  //@ts-ignore
  children: <Button>버튼</Button>
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  //@ts-ignore
  children: <img src="/images/calendar.png" alt="calendar icon"/>
};
