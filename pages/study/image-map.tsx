import React, {useEffect} from 'react';
import styled from 'styled-components';
import ImageMap from 'image-map';

// URL: http://localhost:3000/study/image-map
export default function Page() {
  useEffect(() => {
    ImageMap('#target', 200);
  }, []);

  return (
    <>
      <Img id="target" useMap="#image-map" src="/images/map.png"/>

      <map name="image-map">
        <area onClick={() => console.log("1")} coords="131,29,481,145" shape="rect"/>
        <area onClick={() => console.log("2")} coords="493,28,771,143" shape="rect"/>
        <area onClick={() => console.log("3")} coords="29,172,260,287" shape="rect"/>
        <area onClick={() => console.log("4")} coords="270,172,503,288" shape="rect"/>
        <area onClick={() => console.log("5")} coords="511,173,875,288" shape="rect"/>
        <area onClick={() => console.log("6")} coords="106,316,496,432" shape="rect"/>
        <area onClick={() => console.log("7")} coords="503,316,773,432" shape="rect"/>
      </map>
    </>
  );
}

const Img = styled.img`
  width: 100%;
`;
