export const BASIC_MODAL_SCSS_CODE = `
.BasicModal-wrap {

}

.backContainer {

  display: none;

  > .innerContainer {
    margin: auto;
    width: 80%;
    background: white;
  }

  &.active {
    display: flex;
    align-items: center;

    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
}
`;

export const BASIC_MODAL_PROP_CODE = `
export interface BasicModalProp extends PropsWithChildren<{}> {
  visible: boolean;
  children: ReactNode;
  className?: string;
}
`;
