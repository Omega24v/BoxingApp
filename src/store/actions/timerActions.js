import {SET_DEFAULT_VALUES, START, STOP} from "../types";

export const startTimer = () => {
    return {
        type: START
    }
}

export const stopTimer = () => {
    return {
        type: STOP
    }
}

export const setDefaultValues = () => {
    return {
        type: SET_DEFAULT_VALUES
    }
}