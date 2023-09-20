import Button from '@component/atom/element/Button';
import {useCallback} from 'react';
import {useWindowMessageReceiver} from '@util/extend/browser/window-popup';
import type {ExampleWindowData} from '@type/services/example-window';

export default function Page() {
  const {openNewWindow} = useWindowMessageReceiver<ExampleWindowData>({
    type: 'TEST',
    receiveCallback: ({fruit}) => {
      console.log('receive', fruit);
    }
  });

  const openChildPopup = useCallback(() => {
    openNewWindow('/experimental/window-popup/child', {
      width: 450,
      height: 750
    });
  }, [openNewWindow]);

  return (
    <Button onClick={openChildPopup}>부모창 열기</Button>
  );
}
