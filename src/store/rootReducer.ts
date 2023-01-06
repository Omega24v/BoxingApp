import reducers from './reducers'
import {combineReducers, configureStore, PreloadedState} from "@reduxjs/toolkit";

export const rootReducer = combineReducers(reducers);
export const store = configureStore({
    reducer: rootReducer
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
