'use client';

import {createContext, PropsWithChildren, useCallback, useState} from 'react';
import {EssentialModalProps, ModalPayload, ModalState} from '@/utils/extend/modal';

export const ModalContext = createContext<ModalState<EssentialModalProps>>({
  list: [],
  open: () => {}
});

export default function ModalProvider({children}: PropsWithChildren) {
  const [list, setList] = useState<ModalState<EssentialModalProps>['list']>([]);

  const onClose = useCallback((targetId: number) => {
    setList(prevState => prevState.filter(props => props.pk != targetId));
  }, []);

  const openModal = useCallback(<P extends EssentialModalProps>(payload: ModalPayload<P>) => {
    const pk = Date.now();

    setList(prevState => prevState.concat({
      pk,
      Component: payload.Component as (props: EssentialModalProps) => JSX.Element | null,
      props: payload.props
    }));
  }, []);

  return (
    <ModalContext.Provider value={{list: list, open: openModal}}>
      {children}
      {list.map(({pk, props, Component}) => (
        <Component key={pk} onClose={() => onClose(pk)} {...props}/>
      ))}
    </ModalContext.Provider>
  );
}
