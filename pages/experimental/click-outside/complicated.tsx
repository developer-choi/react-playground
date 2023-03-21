import React, {forwardRef, PropsWithChildren, Ref} from 'react';
import styled from 'styled-components';
import Button from '@component/atom/element/Button';
import {useToggle} from '@util/extend/react';
import {useClickOutside} from '@util/extend/event/event';

// URL: http://localhost:3000/experimental/click-outside/complicated
export default function Page() {
  return (
    <Wrap>
      <Example name="A"/>
      <Example name="B"/>
    </Wrap>
  );
}

function Example({name}: {name: string}) {
  const {value: visible, setFalse: closeLayer, toggle: toggleLayer} = useToggle();

  const {wrapperRef, ignoreClassName} = useClickOutside<HTMLDivElement>({
    ignoreClassName: `IGNORE-${name}`,
    debug: name,
    callback: closeLayer
  });

  return (
    <LayerContainer ref={wrapperRef} visible={visible} message={`message ${name}`}>
      <Button className={ignoreClassName} onClick={toggleLayer}>Click Me ({name})</Button>
    </LayerContainer>
  );
}

const Wrap = styled.div`
  padding: 20px;
`;

interface LayerContainerProp extends PropsWithChildren {
  visible: boolean;
  message: string;
}

const LayerContainer = forwardRef(function LayerContainer({children, visible, message}: LayerContainerProp, ref: Ref<HTMLDivElement>) {
  return (
    <LayerWrapper>
      {children}

      {!visible ? null : (
        <Layer ref={ref}>
          {message}
        </Layer>
      )}
    </LayerWrapper>
  );
});

const LayerWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const Layer = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 10px);
  box-shadow: 0 0 10px 0 black;
  padding: 10px;
`;
