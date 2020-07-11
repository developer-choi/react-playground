import React, {useState} from 'react';
import BasicModal from '../../../components/basic/BasicModal';
import BasicButton from '../../../components/basic/BasicButton';
import {BASIC_MODAL_PROP_CODE, BASIC_MODAL_SCSS_CODE} from '../../../components/basic/basicModalString';
import {CodeViewer} from '../../../components/basic-extends/CodeViewer';

export default function HowToMakeModal() {

  const [modal1Visible, setModal1Visible] = useState(false);

  return (
      <div className="HowToMakeModal-wrap">
        <div className="button-wrap">
          <BasicButton onClick={() => setModal1Visible(!modal1Visible)}>기본모달</BasicButton>
        </div>
        <CodeViewer>{BASIC_MODAL_SCSS_CODE}</CodeViewer>
        <CodeViewer lang="typescript">{BASIC_MODAL_PROP_CODE}</CodeViewer>
        <BasicModal visible={modal1Visible}>
          <p>기본 모달은 다른 모달을 만들 때 children만 넘겨서 만들 수 있을 정도면 된다.</p>
        </BasicModal>
      </div>
  );
}
