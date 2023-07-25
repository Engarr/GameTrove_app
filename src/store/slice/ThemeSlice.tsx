import { createSlice } from '@reduxjs/toolkit';
import type { State } from '../store';

export interface ColorModeState {
  colorMode: string;
}

const localStorageMode = localStorage.getItem('theme');
const defaultColorMode = localStorageMode || 'dark';
const initialState: ColorModeState = {
  colorMode: defaultColorMode,
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    toggleMode(state) {
      if (state.colorMode === 'dark') {
        return {
          ...state,
          colorMode: 'light',
        };
      }
      return {
        ...state,
        colorMode: 'dark',
      };
    },
  },
});
export default modeSlice.reducer;

export const { toggleMode } = modeSlice.actions;
export const colorMode = (state: State) => state.mode.colorMode;
