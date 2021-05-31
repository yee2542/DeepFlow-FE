import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaDataType, VideoFileType } from 'Modules/videos/models/types';
import { ErrorStateCodeEnum } from 'Stores/common/types/error';
import { fetchVideoData } from './actions';
import { initVideoState } from './init';
import { VIDEO } from './types';

const videoSlice = createSlice({
  name: VIDEO,
  initialState: initVideoState,
  reducers: {
    init(state) {
      return { ...state, ...initVideoState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideoData.rejected, (state) => {
      state.ready = false;
      state.error = {
        code: ErrorStateCodeEnum.ServerInternalError,
        msg: 'api error',
      };
    });
    builder.addCase(fetchVideoData.pending, (state) => {
      state.ready = false;
      state.error = undefined;
    });
    builder.addCase(
      fetchVideoData.fulfilled,
      (state, action: PayloadAction<{ data: VideoFileType }>) => {
        const { data } = action.payload;
        state.ready = true;
        state.error = undefined;
        state.videoFile = data;

        const metaData = Object.keys(data).reduce((accumulator, key) => {
          if (key !== 'deleteFlag' && key !== 'url') {
            accumulator[key] = data[key];
          }
          return accumulator;
        }, {}) as MetaDataType;
        state.present.metaData = metaData;
      },
    );
  },
});
export default videoSlice.reducer;
export const videoActions = videoSlice.actions;
