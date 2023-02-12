import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppDispatch} from '@store/hooks';
import {useCallback} from 'react';
import type {AlertModalProp} from '@component/molecules/modal/AlertModal';
import AlertModal from '@component/molecules/modal/AlertModal';
import type {ConfirmModalProp} from '@component/molecules/modal/ConfirmModal';

//모달을 띄우려면 최소한 있어야하는 타입 (store를 통해서 띄우지않고 local state를 통해서 모달을 띄우는 한이 있더라도 이 타입은 반드시 필요함)
export interface EssentialModalProp {
  closeModal: () => void;
}

export type CloseModalCallback = EssentialModalProp['closeModal'];

type WithoutEssentialModalProp<T> = Omit<T, keyof EssentialModalProp>;

export interface ModalPayload<P extends EssentialModalProp> {
  /**
   * dispatch할 때 props 타입에는 close()가 필요하지않음. (_app에서 close props를 전달하기때문)
   * 하지만 Portal에서 모달을 렌더링할때는 close()가 필요함. store를 통해서던, local state를 통해서건 간에 결과적으로 close props는 전달되야하기때문.
   */
  props: WithoutEssentialModalProp<P>;
  Component: (props: P) => JSX.Element,
}

export interface ModalState {
  /**
   * pk는 모달의 state값에만 존재하고,
   * 실제 모달 컴포넌트의 props에는 전달되지않아야함. (close할때만 필요한 값이기 때문)
   */
  modals: (ModalPayload<EssentialModalProp> & {pk: number})[];
}

const initialState: ModalState = {
  modals: []
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (state, {payload}: PayloadAction<number>) => {
      state.modals = state.modals.filter(modal => payload !== modal.pk);
    },
    openModal: (state, {payload}: PayloadAction<ModalPayload<any>>) => {
      state.modals.push({
        Component: payload.Component,
        props: payload.props,
        pk: new Date().getTime()
      });
    }
  }
});

export const {closeModal} = modalSlice.actions;
export default modalSlice.reducer;

export function useDispatchOpenModal() {
  const dispatch = useAppDispatch();

  const openModal = useCallback(<P extends EssentialModalProp>(payload: ModalPayload<P>) => {
    dispatch(modalSlice.actions.openModal(payload));
  }, [dispatch]);

  /****************************************************************************
   * Frequently used callbacks
   ****************************************************************************/

  const openAlertModal = useCallback((props: string | WithoutEssentialModalProp<AlertModalProp>) => {
    if (typeof props === 'string') {
      openModal({
        Component: AlertModal,
        props: {
          content: props
        }
      });

    } else {
      openModal({
        Component: AlertModal,
        props
      });
    }
  }, [openModal]);

  const openConfirmModal = useCallback((props: WithoutEssentialModalProp<ConfirmModalProp>) => {
    openModal({
      Component: AlertModal,
      props
    });
  }, [openModal]);

  return {
    openModal,
    openAlertModal,
    openConfirmModal
  };
}
