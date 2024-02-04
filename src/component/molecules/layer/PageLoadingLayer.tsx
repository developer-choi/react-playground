import styled from "styled-components";
import {flexCenter} from "@util/services/style/css";

export default function PageLoadingLayer() {
  return (
    <Wrap>
      Some Loading UI...
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  ${flexCenter};
  
  font-size: 40px;
  font-weight: bold;
`;
