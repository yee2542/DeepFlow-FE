import { createSlice } from '@reduxjs/toolkit';
import { initAlbumState } from './init';
import { ALBUM } from './types';

export const albumSlice = createSlice({
  name: ALBUM,
  initialState: initAlbumState,
  reducers: {
    init(state) {
      return { ...state, ...initAlbumState };
    },
  },
});

export default albumSlice.reducer;

export const albumActions = albumSlice.actions;
