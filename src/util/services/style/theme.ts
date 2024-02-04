import type {DefaultTheme} from 'styled-components';

export const COLORS = {
  reactBlue: 'rgb(97, 218, 251)',
  black1: '#20232a',
  black2: '#1a1a1a',
  gray1: 'gray',
  lightBlack: 'rgb(40,44,52)',
  red1: '#ff000055'
};

export const theme: DefaultTheme = {
  main: COLORS.reactBlue,
  error: COLORS.red1
};
