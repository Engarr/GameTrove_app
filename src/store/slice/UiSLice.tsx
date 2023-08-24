import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { State } from '../store';

export interface UiModeSlice {
  scrollPosition: number;
  activeLeftBar: boolean;
  activeRightBar: boolean;
  sortingOption: {
    title: string;
    value: string;
  };
}

const initialState: UiModeSlice = {
  scrollPosition: 0,
  activeLeftBar: false,
  activeRightBar: false,
  sortingOption: {
    title: 'Default sorting',
    value: 'default',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    sortingHandler(state, action) {
      return {
        ...state,
        sortingOption: {
          title: action.payload.title,
          value: action.payload.value,
        },
      };
    },
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

export const {
  toggleActiveLeftNavBar,
  toggleActiveRightNavBar,
  sortingHandler,
} = uiSlice.actions;
export const activeLeftBar = (state: State) => state.ui.activeLeftBar;
export const activeRightBar = (state: State) => state.ui.activeRightBar;
export const sortingOption = (state: State) => state.ui.sortingOption;
