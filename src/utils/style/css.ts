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

export function nthChilds(selector: string, numbers: number[], code: string) {

  if (numbers.length === 0) {
    return css`
    ${selector}:nth-child(0) {
      ${code}      
    }
`;
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
