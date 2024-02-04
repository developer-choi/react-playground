import React, {useCallback} from 'react';
import {isOurAOSApp, isOurIOSApp} from '@util/services/app/core';
import {behaveInAOS, behaveInIOS, BehaveParam} from '@util/services/app/some-interface';

export default function Page() {
  const onClick = useCallback(() => {
    const data: BehaveParam = {
      data1: 'data1',
      data2: 'data2'
    }

    if (isOurAOSApp()) {
      behaveInAOS(data);

    } else if (isOurIOSApp()) {
      behaveInIOS(data);

    } else {
      //웹에서 작동해야하는 로직
    }
  }, []);

  return (
    <button onClick={onClick}>
      버튼
    </button>
  );
}
