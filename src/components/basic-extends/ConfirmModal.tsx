import React from 'react';
import BasicModal from '../basic/BasicModal';

export interface ConfirmModalProp {
  title: string;
  content: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function ConfirmModal({visible, content, title, setVisible}: ConfirmModalProp) {

  return (
      <BasicModal className="ConfirmModal-wrap" visible={visible}>
        <span>{title}</span>
        <span>{content}</span>
        <button>Cancel</button>
        <button onClick={() => setVisible(false)}>Confirm</button>
      </BasicModal>
  );
}
