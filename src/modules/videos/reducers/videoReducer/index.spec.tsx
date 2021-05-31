import { configureStore } from '@reduxjs/toolkit';
import { videoFile } from 'Modules/videos/mocks/videoFile';
import { combineReducers } from 'redux';
import videoReducer, { videoActions } from '.';
import { fetchVideoData } from './actions';
import { initVideoState } from './init';

const rootReducer = combineReducers({
  video: videoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

describe('reducers/videoReducer test', () => {
  beforeEach(() => {
    store.dispatch(videoActions.init());
  });

  it('it should correctly define initial state', () => {
    store.dispatch(videoActions.init());
    const result = store.getState().video;
    expect(result).toEqual(initVideoState);
  });

  it('it should set video file correctly', () => {
    store.dispatch({
      type: fetchVideoData.fulfilled.type,
      payload: { data: videoFile },
    });

    const expectedResult = {
      originalFileName: 'La La Land (2016 Movie) Official Clip – “City Of Stars”',
      size: 4100000,
      type: 'video',
      format: '.mp4',
      width: 1920,
      height: 1080,
      date: 'Wed May 12 2021 23:06:42 GMT+0700 (Indochina Time)',
      place: '-',
    };

    const result = store.getState().video.videoFile;
    const resultMetaData = store.getState().video.present.metaData;

    expect(result).toEqual(videoFile);
    expect(resultMetaData).toEqual(expectedResult);
  });
});
