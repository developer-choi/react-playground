import React from 'react';
import Image from "next/image";
import styled from "styled-components";

export default function Page() {
  return (
    <Wrapper>
      <Image
        src="https://oksite.kr/storage/images/banner/ebppI8N5VV8AzTabdVQdKBnPUj2qcYrIMDTmKDqa.jpg"
        alt="배너이미지"
        layout="fill"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  
  > * {
    border: 5px solid red;
  }
`;