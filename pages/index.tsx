import React, {useCallback} from 'react';
import {Button} from '@components/atom/button/button-presets';
import useDebouncedCallback from 'src/utils/custom-hooks/useDebouncedCallback';

export default function Page() {
  
  const onClick = useDebouncedCallback(useCallback(() => {
    console.log('clicked');
  }, []));
  
  return (
      <Button onClick={onClick}>광클버튼</Button>
  );
}
