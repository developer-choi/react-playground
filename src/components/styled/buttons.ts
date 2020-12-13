import styled from 'styled-components';

export const BasicButton = styled.button.attrs(() => ({type: 'button'}))`

  display: inline-flex;
  justify-content: center;
  align-items: center;

  //button은 이 값이 기본값이지만, button을 a로 쓰는 경우에 필요해서 추가.
  text-align: center;

  //button은 이 값이 기본값이지만, button을 a로 쓰는경우 서로 디자인이 통일되야해서 추가.
  line-height: normal;

  &:hover {
    opacity: 0.7;
  }
`;

export const BasicSizeButton = styled(BasicButton)`
  padding: 10px 20px;
  min-width: 100px;
`;

export const BottomButtonWrap = styled.div`
  margin-top: 10px;
  text-align: right;

  > :first-child {
    margin-right: 10px;
  }
`;

export const SubmitButton = styled(BasicSizeButton)`
  background-color: ${props => props.theme.main};
  color: white;
`;

export const CancelButton = styled(BasicSizeButton)`
  background-color: ${props => props.theme.cancel};
  color: white;
`;
