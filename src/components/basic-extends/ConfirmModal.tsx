import React from 'react';
import styled from 'styled-components';
import BasicModal, {BasicModalProp} from '../basic/BasicModal';
import BasicButton from '../basic/BasicButton';

export interface ConfirmModalProp extends BasicModalProp{

}
export default function ConfirmModal({setVisible, ...rest}: ConfirmModalProp) {

  return (
      <ConfirmModalStyle setVisible={setVisible} {...rest}>

        <Content>
          <span>Hello World</span>
        </Content>

        <ButtonWrap>
          <BasicButton onClick={() => setVisible(false)}>Cancel</BasicButton>
          <BasicButton onClick={() => setVisible(false)}>Confirm</BasicButton>
        </ButtonWrap>

      </ConfirmModalStyle>
  );
}

const ConfirmModalStyle = styled(BasicModal)`
  padding: 20px;
`;

const Content = styled.div`
  margin-bottom: 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  > button:first-child {
    margin-right: 10px;
  }
`;
