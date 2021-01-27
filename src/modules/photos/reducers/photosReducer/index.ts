import { createSlice } from '@reduxjs/toolkit';
import { initPhotosState } from './init';

const photosSlice = createSlice({
  name: 'PHOTOS',
  initialState: initPhotosState,
  reducers: {},
});

export default photosSlice.reducer;