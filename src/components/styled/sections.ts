import styled from 'styled-components';
import {HEIGHTS} from '../../utils/style/layout';

/**
 * Header Footer는 누구나 위에있고 아래에있는거라고 바로 매치가 되지만,
 * 섹션이라고 하면 사람들마다 쓰는 뜻이 다르기 때문에,
 * 굳이 앞에 Layout이라고 붙이고,
 * 또 이거는 styled로만 구현했기 때문에 styled폴더에 작성한다.
 */
export const LayoutSection = styled.section`
  flex-grow: 1;
  margin-top: ${HEIGHTS.header}px;
`;

export const SubSection = styled.div`
  border-radius: 10px;
  
  &.shadow {
    box-shadow: ${props => props.theme.generalShadow};
  }
  
  &.apply-padding {
    padding: 10px;
  }
`;
