import {css} from 'styled-components';

export const FlexDirectionColumn = css`
  display: flex;
  flex-direction: column;
`;

export const FlexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlignItemsCenter = css`
  display: flex;
  align-items: center;
`;

export const RemoveRightBorderRadius = css`
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`;

export const RemoveLeftBorderRadius = css`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
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

export function nthChilds(selector: string, numbers: number[], code: string) {

  if (numbers.length === 0) {
    return '';

  } else if (numbers.length === 1) {
    return nthFormat(selector, numbers[0]);
  }

  const first = numbers[0];
  const rest = numbers.slice(1);
  const _nthChilds = rest.map(value => nthFormat(selector, value)).join(',');

  return css`
  ${_nthChilds}, ${nthFormat(selector, first)} {
    ${code};
  }
`;
}

function nthFormat(selector: string, value: number) {
  return css`${selector}:nth-child(${value})`;
}
