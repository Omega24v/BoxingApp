import reducers from './reducers'
import {combineReducers, configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers(reducers);
export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch
