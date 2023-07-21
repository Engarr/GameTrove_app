import { createSlice } from '@reduxjs/toolkit';
import type { State } from '../store';

export interface PaginationModeState {
  actualPage: number;
}

const initialState: PaginationModeState = {
  actualPage: 1,
};

const paginationSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changePageUp(state) {
      return {
        ...state,
        actualPage: state.actualPage + 1,
      };
    },
    changePageDown(state) {
      return {
        ...state,
        actualPage: state.actualPage - 1,
      };
    },
    switchPage(state, action) {
      return {
        ...state,
        actualPage: action.payload,
      };
    },
  },
});

export default paginationSlice.reducer;

export const { changePageUp, changePageDown, switchPage } =
  paginationSlice.actions;
export const actualPage = (state: State) => state.pagination.actualPage;
