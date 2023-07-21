import { createSlice } from '@reduxjs/toolkit';

export interface UiModeSlice {
  scrollPosition: number;
}

const initialState: UiModeSlice = {
  scrollPosition: 0,
};

const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
});
