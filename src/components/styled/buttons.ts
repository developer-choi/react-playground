import styled, {css} from 'styled-components';

//colors (color, background-color)
export const ButtonColor1 = css`
  color: ${props => props.theme.textColor1};
  background-color: ${props => props.theme.backColor1};
`;

export const ButtonColor2 = css`
  color: ${props => props.theme.textColor2};
  background-color: ${props => props.theme.color2};

  &:disabled {
    background-color: ${props => props.theme.gray1};
  }

  &:active {
    //color: some-color;
    //background-color: some-color;
  }

  &:visited {
    //color: some-color;
    //background-color: some-color;
  }

  &:focus {
    //color: some-color;
    //background-color: some-color;
  }
`;

export const BasicButton = styled.button.attrs(() => ({type: 'button'}))`

  //이 값들은, 이미지를 button으로 감쌀 때, 이미지를 버튼기준으로 수직수평중앙정렬할 때 필요함.
  display: inline-flex;
  justify-content: center;
  align-items: center;

  //button은 이 값이 기본값이지만, button을 a로 쓰는 경우에 필요해서 추가.
  text-align: center;

  //button은 이 값이 기본값이지만, button을 a로 쓰는경우 서로 디자인이 통일되야해서 추가.
  line-height: normal;

  &:disabled {
    cursor: not-allowed;
    background-color: lightgray;
    color: white;
  }
  
  //general styling
  &:hover {
    opacity: 0.7;
  }
  
  //colors
  &.color1 {
    ${ButtonColor1};
  }
  
  &.color2 {
    ${ButtonColor2};
  }
`;

//size
export const BasicSizeButton = styled(BasicButton)`
  padding: 10px 20px;
  min-width: 100px;
  font-size: 13px;
`;

export const SmallSizeButton = styled(BasicButton)`
  font-size: 15px;
  padding: 10px 20px;
  min-width: 100px;
  border-radius: 5px; //size에는 border-radius도 포함되고,
  flex-shrink: 0; //버튼들 중에는 길이가 줄어들면 안되는 경우도 있어서 여기에 선언한다.
`;

//ready-made (select color and size)
export const SubmitButton = styled(BasicSizeButton)`
  ${ButtonColor1};
  ${BasicSizeButton};
`;

export const TableBottomButton = styled(SmallSizeButton)`
  align-self: flex-end;
  ${ButtonColor1};
`;
