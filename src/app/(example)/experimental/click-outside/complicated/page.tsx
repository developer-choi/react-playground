'use client';

import React, {ForwardedRef, forwardRef, PropsWithChildren} from 'react';
import styles from './page.module.scss';
import {useToggle} from '@/utils/extend/library/react';
import {useClickOutside} from '@/utils/extend/event/click-outside';

// URL: http://localhost:3000/experimental/click-outside/complicated
export default function Page() {
  return (
    <div style={{padding: 20}}>
      <Example name="A"/>
      <Example name="B"/>
    </div>
  );
}

function Example({name}: {name: string}) {
  const {bool: visible, setFalse: closeLayer, toggle: toggleLayer} = useToggle();

  const {wrapperRef, ignoreClassName} = useClickOutside<HTMLDivElement>({
    ignoreClassName: `IGNORE-${name}`,
    debug: name,
    callback: closeLayer
  });

  return (
    <LayerContainer ref={wrapperRef} visible={visible} message={`message ${name}`}>
      <button className={ignoreClassName} onClick={toggleLayer}>Click Me ({name})</button>
    </LayerContainer>
  );
}

interface LayerContainerProp extends PropsWithChildren {
  visible: boolean;
  message: string;
}

const LayerContainer = forwardRef(function LayerContainer({children, visible, message}: LayerContainerProp, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div className={styles.layerWrapper}>
      {children}

      {!visible ? null : (
        <div ref={ref} className={styles.layer}>
          {message}
        </div>
      )}
    </div>
  );
});
