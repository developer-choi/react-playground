import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function StyledComponentLibraryPage() {

  return (
      <Wrap>
        <StyledThree as={Link} to="">hello</StyledThree>
      </Wrap>
  );
}

const Wrap = styled.div`
`;

const StyledOne = styled.button`
  color: white;
`;

const StyledTwo = styled(StyledOne)`
  background-color: red;
`;

function StyledTwoWrap(props: any) {
  return <StyledTwo {...props}/>
}

// const StyledThree = styled(StyledTwo)`
const StyledThree = styled(StyledTwoWrap)`
  font-weight: bold;
`;
