import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

export default function InlineFlexPage() {
  
  return (
      <>
        <Head>
          <title>inline-flex</title>
        </Head>
        {/*
        이게 React가 아니었으면, 이렇게 할 경우 원래는 이미지마다 간격이 있었어야했다. 이거 html로 작성하면 실제로 이미지마다 간격이 생긴다.
        https://ko.reactjs.org/docs/jsx-in-depth.html#string-literals-1 JSX는 각 줄의 처음과 끝에있는 공백을 제거하기때문에,
        (여기서 말하는 공백은 ' ' 뿐 아니라 \n도 같이 제거하는것으로 보인다.)
        
        원래 html이라면 아래 JSX는
        <div>\n
        <img>\n
        <img>\n
        <img>\n
        </div>
        이렇게 되고, html에서 \n은 공백으로 표현되기떄문에 이미지마다 간격이 보이지만,
        우리의 React는 이걸 다 제거시켜주기때문에
        이미지마다 간격이 inline tag의 그 특유의 그 font-size로 유발되는 미세한 간격이 사라진다.
        
        (이미지 3개와 Wrap 아래의 미세한 간격이 여전히 존재하는 이유는 모르겠음.)
        */}
        <Wrap>
          <Img src={src}/>
          <Img src={src}/>
          <Img src={src}/>
        </Wrap>
        
        {/*
        JSX가 아니라 html에서는 위에서 말했듯이
        <div>\n
        <img>\n
        <img>\n
        <img>\n
        </div>
        이렇게 렌더링이 되기때문에,
        
        아래와같이 부모에 white-space 속성을 주면 이미지들이 세로로 배열되지만,
        우리 React는 <div><img><img><img></div> 이렇게 다 제거되어 렌더링시키기 때문에, 이렇게 white-space속성을 주더라도 아무런변화가없다.
        
        어쨌든! inline-tag의 그 미세한 간격이 생기는 이유는 \n 이거이기때문에, font-size 0을 줬을 때 그 간격이 사라진다는 지식도 같이 얻어가면 된다.
         */}
        <Wrap style={{whiteSpace: 'pre-line'}}>
          <Img src={src}/>
          <Img src={src}/>
          <Img src={src}/>
        </Wrap>
      </>
  );
};

const src = 'https://www.navercorp.com/img/ko/main/img_main_slide1.jpg';

const Wrap = styled.div`
  background-color: lightgray;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;
