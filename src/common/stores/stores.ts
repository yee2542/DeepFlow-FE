import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import userReducer from 'Modules/user/reducers/userReducer';
import thunk, { ThunkMiddleware } from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer,
});

export const middleware: ThunkMiddleware[] | Middleware[] = [thunk];

export type StoresState = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export { store, rootReducer };