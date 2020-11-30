import React from 'react';
import styled from 'styled-components';
import {Bar, BarChart, CartesianGrid, XAxis, YAxis,} from 'recharts';

export default function HorizontalBarChart({...rest}: any) {

  return (
      <Wrap {...rest}>
      <BarChart layout="vertical" width={500} height={400} data={data} margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
  <CartesianGrid stroke="#f5f5f5" />
  <XAxis type="number" />
  <YAxis dataKey="name" type="category" />
  <Bar dataKey="pv" barSize={20} fill="#413ea0" />
      </BarChart>
  {/*<BarChart layout="vertical" width={500} height={300} data={data} margin={{top: 20, right: 30, left: 20, bottom: 5,}}>*/}
  {/*  <CartesianGrid strokeDasharray="3 3"/>*/}
  {/*  <XAxis/>*/}
  {/*  <YAxis dataKey="name"/>*/}
  {/*  <Bar dataKey="pv" stackId="a" fill="#8884d8"/>*/}
  {/*  <Bar dataKey="uv" stackId="a" fill="#82ca9d"/>*/}
  {/*</BarChart>*/}
  </Wrap>
);
}

const Wrap = styled.div`
`;

const data = [
  {
    name: 'Page A', uv: 590, pv: 800, amt: 1400,
  },
  {
    name: 'Page B', uv: 868, pv: 967, amt: 1506,
  },
  {
    name: 'Page C', uv: 1397, pv: 1098, amt: 989,
  },
  {
    name: 'Page D', uv: 1480, pv: 1200, amt: 1228,
  },
  {
    name: 'Page E', uv: 1520, pv: 1108, amt: 1100,
  },
  {
    name: 'Page F', uv: 1400, pv: 680, amt: 1700,
  },
];
