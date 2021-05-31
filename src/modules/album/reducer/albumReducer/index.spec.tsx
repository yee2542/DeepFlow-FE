import { combineReducers, configureStore } from '@reduxjs/toolkit';
import albumReducer from './index';
import { albumActions } from './index';
import { initAlbumState } from './init';

const rootReducer = combineReducers({
  album: albumReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

describe('albumReducer test', () => {
  it('it should correctly define initial state', () => {
    store.dispatch(albumActions.init());
    const result = store.getState().album;
    expect(result).toEqual(initAlbumState);
  });
});
