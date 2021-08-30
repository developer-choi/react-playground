import {css} from 'styled-components';

export const flexDirectionColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const alignItemsCenter = css`
  display: flex;
  align-items: center;
`;

export const absoluteAllZero = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const absoluteCenter = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const removeRightBorderRadius = css`
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`;

export const removeLeftBorderRadius = css`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
`;

export function circleCss(radius: number | string) {
  const _radius = typeof radius === 'string' ? radius : `${radius}px`;
  
  return css`
    width: ${_radius};
    height: ${_radius};
    border-radius: 100%;
  `;
}

export function circleStyle(radius: number | string) {
  const _radius = typeof radius === 'string' ? radius : `${radius}px`;
  
  return {
    width: _radius,
    height: _radius
  };
}

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
