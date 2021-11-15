import {loadData} from "../../../utils/localStorage/localStorage";
import {TOGGLE_THEME} from "../../types";

const persistedState = loadData('data');

const initialState = {
    currTheme: persistedState?.currTheme || 'dark'
};

export default function themeReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_THEME:
            return {...state, currTheme: action.payload}
        default:
            return state;
    }
}