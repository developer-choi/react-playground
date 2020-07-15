import React from 'react';
import styled from 'styled-components';

export default function PageNotFound() {

  return (
      <PageNotFoundStyle>
        <span className="title">PageNotFound</span>
        <span className="sub-title">We couldnt find what you were looking for.</span>
        <span className="content">Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</span>
      </PageNotFoundStyle>
  );
}

const PageNotFoundStyle = styled.div`
  padding: 40px 60px;

  > * {
    display: block;
    margin-top: 30px;
  }

  .title {
    font-weight: bold;
    font-size: 50px;
  }

  .sub-title {
    font-size: 30px;
    color: gray;
  }

  .content {
    font-size: 20px;
  }
`;
