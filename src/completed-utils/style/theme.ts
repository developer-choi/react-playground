interface Theme {
  //아래 다른 property에 대해 자동완성도 되면서 theme를 확장할 수 있도록 하기 위함.
  [key: string]: string | number | Object;

  //어떤 사이트건 간에 기본적으로 포함되야하는 property
  colors: Object;
  background: string;
  foreground: string;
  main: string;
}

/**
 * [color], light[Color], dark[Color]
 */
const colors = {
  green: 'rgb(0, 210, 70)',
  lightGreen: 'rgb(212, 244, 220)',
  orange: 'rgb(255, 164, 0)',
  lightOrange: 'rgb(255, 240, 196)',
  blue: 'rgb(53, 169, 255)',
  basicBlack: 'rgb(78, 80, 81)',
};

export const theme: Theme = {
  colors,
  background: 'white',
  foreground: colors.basicBlack,
  main: colors.blue
};
