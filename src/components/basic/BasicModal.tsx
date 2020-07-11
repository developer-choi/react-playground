import React, {PropsWithChildren, ReactNode} from 'react';
import './BasicModal.scss';

export interface BasicModalProp extends PropsWithChildren<{}> {
  visible: boolean;
  children: ReactNode;
  className?: string;
}

export default function BasicModal({visible, children, className}: BasicModalProp) {

  return (
      <div className={`BasicModal-wrap backContainer ${visible ? 'active' : ''} ${className ?? ''}`}>
        <div className="innerContainer">
          {children}
        </div>
      </div>
  );
}
