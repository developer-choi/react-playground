import React from 'react';
import styled from 'styled-components';
import {LOREM_IPSUM, LOREM_IPSUM_WITHOUT_BLANK} from '../../../utils/dummy';

export default function TextCutPage() {

  return (
      <Wrap>
        <table>
          <tbody>
          <tr>
            <td>{LOREM_IPSUM_WITHOUT_BLANK}</td>
            <td>123456789123456789</td>
          </tr>
          </tbody>
        </table>
        <table>
          <tbody>
          <tr>
            <td>{LOREM_IPSUM}</td>
            <td>123456789123456789</td>
          </tr>
          </tbody>
        </table>
        <table>
          <tbody>
          <tr>
            <td style={{maxWidth: 120}}>{LOREM_IPSUM_WITHOUT_BLANK}</td>
            <td>123456789123456789</td>
          </tr>
          </tbody>
        </table>
        <table>
          <tbody>
          <tr>
            <td style={{maxWidth: 120}}>{LOREM_IPSUM}</td>
            <td>123456789123456789</td>
          </tr>
          </tbody>
        </table>
      {/*
      텍스트가 중간에 공백같은게 없는 경우 글자가 잘 안잘리는 경우가 있더라 저렇게. 3번째 테이블처럼.
      */}
      <TextCut1>{LOREM_IPSUM_WITHOUT_BLANK}</TextCut1>
      <TextCut1>{LOREM_IPSUM}</TextCut1>
      </Wrap>
  );
}

const Wrap = styled.div`
  td:nth-child(1) {
    background-color: orangered;
  }
  td:nth-child(2) {
    background-color: mediumpurple;
  }
  tr {
    margin-bottom: 10px;
  }
  td {
    border: 3px solid black;
  }
  
  table {
    margin-bottom: 20px;
  }
`;

const TextCut1 = styled.span`
  display: block;
  margin-bottom: 20px;
  width: 100px;
  overflow:hidden; 
  text-overflow:ellipsis; 
  white-space:nowrap;
`;
