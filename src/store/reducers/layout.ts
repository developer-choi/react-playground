import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppDispatch} from '@store/hooks';
import {useEffect} from 'react';

export interface HeaderProp {
  title: string;
  backgroundColor?: string;
  height?: number | string;
  onClickHeader?: () => void;
}

export interface LayoutState {
  headerProp: HeaderProp;
}

const initialState: LayoutState = {
  headerProp: {
    title: '',
    backgroundColor: "yellow",
    height: "auto"
  },
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setHeaderActionCreator: (state, {payload}: PayloadAction<HeaderProp>) => {
      state.headerProp = payload;
    }
  }
});

export const {setHeaderActionCreator} = layoutSlice.actions;
export default layoutSlice.reducer;

export function useLayout(props: string | HeaderProp) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const headerProp: HeaderProp = typeof props === 'string' ? {title: props} : props;
    dispatch(setHeaderActionCreator(headerProp));
  }, [dispatch, props]);
}
