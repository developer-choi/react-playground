import {css} from "styled-components";

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
  const _radius = typeof radius === "string" ? radius : `${radius}px`;

  return css`
    width: ${_radius};
    height: ${_radius};
    border-radius: 100%;
  `;
}
