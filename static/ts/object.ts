interface Electric {
  current: number;
  voltage: number;
}

interface RST {
  r: Electric;
  s: Electric;
  t: Electric;
}

//서버에서 받을 데이터 타입 및 예시데이터
const rstData: RST = {
  r: {
    voltage: 123,
    current: 123,
  },
  s: {
    voltage: 123,
    current: 123,
  },
  t: {
    voltage: 123,
    current: 123,
  }
}

interface Chart {
  name: string;
  current: number;
  voltage: number;
}

//차트에 그리기 위해 가공해야하는 데이터 타입 및 예시
const chartData: Chart[] = [
  {name: 'R상', current: 123, voltage: 123},
  {name: 'S상', current: 123, voltage: 123},
  {name: 'T상', current: 123, voltage: 123}
];

//가공하는데 필요한 함수 시그니처 예시
declare function example(input: RST): Chart[];

//가공 함수 구현체. + Object.keys에 제네릭이 없어서 type assertion과 같이 사용한 예시
function rstToChart(rst: RST) {

  const rstKeys = Object.keys(rst) as (keyof RST)[];

  return rstKeys.map(key => ({
    name: key.toUpperCase() + '상',
    ...rst[key]
  }));
}

console.log(rstToChart(rstData));
