import {TOGGLE_THEME} from "../types";

export const toggleTheme = data => {
    return {
        type: TOGGLE_THEME,
        payload: data
    }
}