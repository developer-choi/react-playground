import React from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import styled from 'styled-components';

const geoUrl =
    'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

/**
 * AG : 남극
 * GL : 그린란드
 * TF : Antarctic Lands, 프랑스령 남방 및 남극
 */
const withoutList = ['AQ', 'GL', 'TF'];

export default function MapChart({projection}: any) {

  return (
      <ComposableMap projection={projection()}>
      <GeographiesStyle geography={geoUrl}>
          {({geographies}) =>
  geographies.map(geo => {
    const iso = geo.properties.ISO_A2;

    if (withoutList.includes(iso)) {
      console.log(geo);
      return null;
    }

    return <GeographyStyle className={iso.startsWith('A') || iso.startsWith('B') | iso.startsWith('C')? 'active' : ''}
    key={geo.rsmKey} geography={geo} onClick={() => console.log(geo)}/>;
  })
}
  </GeographiesStyle>
  </ComposableMap>
);
};

const GeographiesStyle = styled(Geographies)`
  
  path {
    stroke: red;
  }
`;

const GeographyStyle = styled(Geography)`
  outline: none;
  
  &.active {
    fill: #04caf4;
  }
`;
