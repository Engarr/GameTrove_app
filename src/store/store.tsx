import { configureStore } from '@reduxjs/toolkit';
import modeSlice, { ColorModeState } from './slice/ThemeSlice';
import paginationSlice, { PaginationModeState } from './slice/PaginationSlice';
import uiSlice, { UiModeSlice } from './slice/UiSLice';
import apiSlice from './api/apiSlice';

export interface State {
  mode: ColorModeState;
  pagination: PaginationModeState;
  ui: UiModeSlice;
}

const store = configureStore({
  reducer: {
    mode: modeSlice,
    pagination: paginationSlice,
    ui: uiSlice,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
