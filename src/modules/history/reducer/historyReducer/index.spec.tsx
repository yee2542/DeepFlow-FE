import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { fetchHistory } from 'Modules/history/services/fetch.history';
import { fetchHistoryData } from './actions';
import historyReducer, { historyActions } from './index';
import { initHistoryState } from './init';

const rootReducer = combineReducers({
  history: historyReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

describe('historyReducer test', () => {
  it('it should correctly define initial state', () => {
    store.dispatch(historyActions.init());
    const result = store.getState().history;
    expect(result).toEqual(initHistoryState);
  });

  it('should have pending/fulfill fetchHistoryData', async () => {
    const data = fetchHistory();
    store.dispatch({ type: fetchHistoryData.fulfilled.type, payload: { data } });
    expect(store.getState().history.ready).toBe(true);
  });
});
