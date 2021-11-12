import {combineReducers, createStore} from "redux";
import reducers from './reducers'

const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer)
