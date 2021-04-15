import React from 'react';
import styled from 'styled-components';

export default function CardAnimationExample1() {
  
  return (
      <CardComponent/>
  );
}

export function CardComponent() {
  return (
      <Card>
        <OrderCircle>
          <OrderNumber>01</OrderNumber>
        </OrderCircle>
        <Title>Service Name</Title>
        <Content>Lorem ipsum dolor sit amet, cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Content>
        <More>Read More</More>
      </Card>
  );
}

const OrderCircle = styled.div`
  position: absolute;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightcoral;
  box-shadow: 0 0 lightcoral;
  /*box-shadow: lightcoral; 이건 버그생기고, 안써도 버그생김.*/
  /*box-shadow: 0 0 lightcoral; 이건 되고*/
  /*box-shadow: 0 0 0 0lightcoral; 이건 되고*/
`;

const OrderNumber = styled.span`
  color: white;
  font-size: 40px;
  font-weight: bold;
`;

const Title = styled.span`
  margin-top: 120px;
  font-size: 25px;
  font-weight: bold;
  z-index: 1;
`;

const Content = styled.span`
  z-index: 1;
  margin-top: 20px;
  font-size: 18px;
`;

const More = styled.button`
  margin: auto auto 0 auto;
  padding: 15px 30px;
  background: white;
  border: 1px solid gray;
  font-size: 16px;
  z-index: 1;
`;

const Card = styled.div`
  width: 350px;
  border: 1px solid gray;
  padding: 40px;
  height: 450px;
  
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  overflow: hidden;
  
  :hover {
    ${OrderCircle} {
      transition: 0.8s;
      box-shadow: 0 0 0 500px lightcoral;
    }
    ${Title}, ${Content} {
      color: white;
    }
  }
`;
