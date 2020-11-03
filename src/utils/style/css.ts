import {css} from 'styled-components';

export const FlexDirectionColumn = css`
  display: flex;
  flex-direction: column;
`;

export function setLeftRadius(applyClassName: string, value = 0) {

  const suffix = value === 0 ? '' : 'px';

  return css`
    &.${applyClassName} {
      border-top-left-radius: ${value}${suffix};
      border-bottom-left-radius: ${value}${suffix};
    }
`;
}

export function setRightRadius(applyClassName: string, value = 0) {
  const suffix = value === 0 ? '' : 'px';

  return css`
    &.${applyClassName} {
      border-top-right-radius: ${value}${suffix};
      border-bottom-right-radius: ${value}${suffix};
    }
`;
}
