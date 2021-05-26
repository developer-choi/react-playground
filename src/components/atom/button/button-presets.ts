import styled from 'styled-components';
import ButtonExtend from '@components/atom/button/ButtonExtend';
import {COLORS} from '../../../utils/style/theme';

/**
 * Size버튼은 버튼의 윤곽만 담당한다. (크기, 테두리 둥근정도)
 */
export const SmallSizeButton = styled(ButtonExtend)`
  padding: 8px 15px;
  min-width: 90px;
  border-radius: 5px; //size에는 border-radius도 포함되고,
  flex-shrink: 0; //버튼들 중에는 길이가 줄어들면 안되는 경우도 있어서 여기에 선언한다.
`;

/**
 * 실제 버튼은 폰트와 색상(버튼 배경색, 버튼 테두리색)을 담당한다.
 */
export const ReactButton = styled(SmallSizeButton)`
  background-color: ${COLORS.reactBlue};
  color: black;
  font-size: 15px;
  font-weight: bold;
`;

/**
 * 가장 빈번하게 사용될 버튼의 이름을 Button이라고 명명한다.
 */
export const Button = styled(SmallSizeButton)`
  background-color: ${props => props.theme.main};
  color: white;
`;
