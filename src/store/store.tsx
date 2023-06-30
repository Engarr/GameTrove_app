import { configureStore } from '@reduxjs/toolkit';
import modeSlice, { ColorModeState } from './slice/ThemeSlice';
import apiSlice from './api/apiSlice';

export interface State {
  mode: ColorModeState;
}
const store = configureStore({
  reducer: {
    mode: modeSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
