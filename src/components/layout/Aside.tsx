import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';

export default function Aside({children}: PropsWithChildren<{}>) {

  return (
      <AsideStyle>
        {children}
      </AsideStyle>
  );
}

const AsideStyle = styled.aside`

  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  padding: 40px 60px;
  background: whitesmoke;
  width: 350px;

  a {

    margin-bottom: 5px;

    &:hover {
      opacity: 0.7;
    }

    &.active {
      color: rgb(97, 218, 251);
    }
  }
`;
