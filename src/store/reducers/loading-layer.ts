import {createSlice} from "@reduxjs/toolkit";

export interface LoadingLayerState {
  visible: boolean;
}

const initialState: LoadingLayerState = {
  visible: false
};

const loadingLayerSlice = createSlice({
  name: "loadingLayer",
  initialState,
  reducers: {
    closeLoadingLayer: (state) => {
      state.visible = false;
    },
    openLoadingLayer: (state) => {
      state.visible = true;
    }
  }
});

export const {closeLoadingLayer, openLoadingLayer} = loadingLayerSlice.actions;
export default loadingLayerSlice.reducer;
