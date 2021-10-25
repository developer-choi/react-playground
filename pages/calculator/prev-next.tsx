import React, {useState} from 'react';
import InputText from '@component/extend/InputText';
import {signOfNumber} from '@util/extend/number';
import {myClassName} from '@util/libraries/classnames';
import {splitIntoPieces} from '@util/extend/array';
import styled from 'styled-components';

export default function Page() {
  const [value, setValue] = useState('');
  const result = parser(value);
  
  return (
    <div>
      <InputText value={value} onChangeText={setValue}/>
      {result.length > 0 &&
      <Table>
        <thead>
        <tr>
          <th>이름</th>
          <th>전</th>
          <th>후</th>
          <th>전</th>
          <th>후</th>
          <th>차이</th>
        </tr>
        </thead>
        <tbody>
        {result.map(({name, prev, next}) => {
          const {convertedNext, diff} = magic({prev, next});
          const {sign, mark, abs} = signOfNumber(diff);
          
          return (
            <tr key={prev}>
              <td>{name}</td>
              <td>{prev}</td>
              <td>{next}</td>
              <td>100</td>
              <td className="emphasize">{Math.floor(convertedNext)}</td>
              <td className={myClassName(sign, 'emphasize')}>{mark}{Math.floor(abs)}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
      }
    </div>
  );
}

interface Data {
  name: string;
  prev: number;
  next: number;
}

function parser(value: string): Data[] {
  if (value.length === 0) {
    return [];
  }
  
  const cells = value.split('\t').map(value => value.split(' ')).flat();
  
  if (cells.length % 3 !== 0) {
    console.error(value, cells);
    alert('파싱 실패');
    return [];
  }
  
  /**
   * @param cells
   * 3n-2 (n은 자연수) = 사람이름
   * 3n-1 (n은 자연수) = V.max 1값
   * 3n (n은 자연수) = V.max 2값
   */
  
  const validated = cells.some((value, index) => {
    switch (index % 3) {
      
      //한글
      case 0:
        return Number.isNaN(Number(value));
      
      //숫자로 변환가능한 문자열값
      default:
        return !Number.isNaN(Number(value));
    }
  });
  
  if (!validated) {
    console.error(value, cells);
    alert('변환 실퍠');
    return [];
  }
  
  return splitIntoPieces(cells, 3).map(([name, prev, next]) => {
    return {
      name,
      prev: Number(prev),
      next: Number(next)
    };
  });
}

function magic({prev, next}: Omit<Data, 'name'>) {
  const convertedNext = next * 100 / prev;
  return {
    diff: convertedNext - 100,
    convertedNext
  }
}

const Table = styled.table`
  width: 500px;
  margin-top: 20px;
  text-align: center;
  
  th {
    font-weight: bold;
    background: yellow;
  }
  
  td, th {
    border: 1px solid black;
    padding: 5px;
  }
  
  .emphasize {
    font-weight: bold;
  }
  
  .positive {
    color: red;
  }
  
  .negative {
    color: blue;
  }
`;
