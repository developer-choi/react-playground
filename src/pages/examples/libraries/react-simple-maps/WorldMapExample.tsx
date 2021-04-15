import React, {useCallback} from 'react';
import {ComposableMap, Geographies, GeographyType, Geography} from 'react-simple-maps';
import styled from 'styled-components';
import {geoMercator} from 'd3-geo';
import {randomBoolean} from '../../../../utils/web-api-extend/random';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

export default function WorldMapExample() {
  
  const onClickNation = useCallback(({properties: {NAME, ISO_A2, CONTINENT}}: GeographyType) => {
    alert(`${ISO_A2}-${CONTINENT}-${NAME}`);
  }, []);
  
  return (
      <ComposableMap projection={geoMercator() as any}>
        <GeographiesStyle geography={geoUrl}>
          {({geographies}: { geographies: GeographyType[] }) =>
              geographies.map(geo => (
                  <GeographyStyle
                      className={randomBoolean(10) ? 'active' : ''}
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => onClickNation(geo)}
                  />
              ))
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
