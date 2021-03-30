import {DefaultTheme} from 'styled-components';

export const COLORS = {
  reactBlue: 'rgb(97, 218, 251)',
  black1: '#20232a',
  black2: '#1a1a1a',
  gray1: '#f7f7f7',
  lightBlack: 'rgb(40,44,52)'
};

export const theme: DefaultTheme = {
  headerBack1: COLORS.black1,
  asideBack: COLORS.gray1,
  asideText: COLORS.black2,
  pointColor: 'coral',
  lightPointColor: 'lightcoral',
  assistPointColor: 'white',
  error: 'red',
  success: 'lightgreen',
  main: COLORS.reactBlue
};
