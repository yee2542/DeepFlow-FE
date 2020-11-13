import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import userReducer from './userRedcuer/userReducer';
import authReducer from './userReducer/authReducer';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export const middleware: ThunkMiddleware[] | Middleware[] = [thunk];

export type StoresState = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export { store, rootReducer };
