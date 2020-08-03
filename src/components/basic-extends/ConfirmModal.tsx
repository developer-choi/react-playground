import React from 'react';
import styled from 'styled-components';
import BasicModal, {BasicModalProp} from '../basic/BasicModal';
import BasicButton from '../basic/BasicButton';
import {FaCheckCircle} from 'react-icons/fa';
import {AiOutlineWarning} from 'react-icons/ai';

export interface ConfirmModalProp extends BasicModalProp{
  content: string;
  onConfirm?: () => void;
  preset?: 'error' | 'success' | 'normal'
}

export default function ConfirmModal({setVisible, preset = 'normal', onConfirm, ...rest}: ConfirmModalProp) {

  const _onConfirm = () => {
    setVisible(false);
    onConfirm?.();
  }

  return (
      <ConfirmModalStyle setVisible={setVisible} {...rest}>

        <IconWrap>
          {preset === 'success' && SuccessIcon}
          {preset === 'error' && ErrorIcon}
        </IconWrap>

        <ContentWrap>
          <Content preset={preset}>Hello World</Content>
        </ContentWrap>

        <ButtonWrap>
          {onConfirm && <BasicButton onClick={_onConfirm}>Cancel</BasicButton>}
          <BasicButton onClick={_onConfirm}>Confirm</BasicButton>
        </ButtonWrap>

      </ConfirmModalStyle>
  );
}

const ConfirmModalIcon = styled.div`
  margin: 0 auto 20px auto;
`;

const SuccessIcon = <ConfirmModalIcon as={FaCheckCircle} color="lightgreen" size={50}/>;
const ErrorIcon = <ConfirmModalIcon as={AiOutlineWarning} color="red" size={50}/>;

const ConfirmModalStyle = styled(BasicModal)`
  padding: 20px;
`;

const ContentWrap = styled.div`
  margin-bottom: 20px;
`;

const Content = styled.span<Pick<ConfirmModalProp, 'preset'>>`
  ${props => props.preset === 'error' && 'color: red'};
  ${props => props.preset === 'success' && 'color: lightgreen'};
`;

const IconWrap = styled.div`
  display: flex;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  > button:nth-child(2) {
    margin-left: 10px;
  }
`;
