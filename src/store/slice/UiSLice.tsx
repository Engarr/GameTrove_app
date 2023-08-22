import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { State } from '../store';

export interface UiModeSlice {
  scrollPosition: number;
  activeLeftBar: boolean;
  activeRightBar: boolean;
}

const initialState: UiModeSlice = {
  scrollPosition: 0,
  activeLeftBar: false,
  activeRightBar: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleActiveLeftNavBar(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        return {
          ...state,
          activeLeftBar: action.payload,
        };
      }
      return {
        ...state,
        activeLeftBar: !state.activeLeftBar,
      };
    },
    toggleActiveRightNavBar(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        return {
          ...state,
          activeRightBar: action.payload,
        };
      }
      return {
        ...state,
        activeRightBar: !state.activeRightBar,
      };
    },
  },
});
export default uiSlice.reducer;

export const { toggleActiveLeftNavBar, toggleActiveRightNavBar } =
  uiSlice.actions;
export const activeLeftBar = (state: State) => state.ui.activeLeftBar;
export const activeRightBar = (state: State) => state.ui.activeRightBar;
