import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchVideo } from 'Modules/videos/services/fetch.video';
import { VIDEO } from './types';

export const fetchVideoData = createAsyncThunk(VIDEO, async () => {
  return { data: await fetchVideo() };
});
