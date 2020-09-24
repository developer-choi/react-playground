import styled from 'styled-components';
import {ComponentProps} from 'react';
import {FlexDirectionRowCss} from './css';

export const HEADER_HEIGHT = 180;
export const EXTEND_HEADER_HEIGHT = 50;
export const FOOTER_HEIGHT = 100;

export const BIG_SECTION_MARGIN_VERTICAL = 30;
export const SMALL_SECTION_MARGIN_VERTICAL = 10;

export const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FlexDirectionRow = styled.div`
  ${FlexDirectionRowCss};
`;

export const FlexDirectionColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const H2 = styled.h2<ComponentProps<'h2'>>`
  font-size: 24px;
  font-weight: bold;
`;
