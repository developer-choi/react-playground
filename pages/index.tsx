import React from 'react';
import styled from 'styled-components';

export default function Page() {
  
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(2);
  const [value3, setValue3] = React.useState(4);
  
  const onClick = React.useCallback(() => {
    setValue1(prevState => prevState + 1);
    setValue2(prevState => prevState + 2);
    setValue3(prevState => prevState + 3);
  }, []);
  
  React.useEffect(() => {
    document.body.onclick = onClick;
  }, [onClick]);
  
  console.log(value1, value2, value3);
  
  return (
      <Wrap>
        <Text>Click Html Body</Text>
      </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Text = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
