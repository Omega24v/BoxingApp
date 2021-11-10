import {
    ADD_TIMER,
    PAUSE,
    SAVE_EDIT_DATA,
    SET_DEFAULT_VALUES,
    SET_TIMER,
    START,
    STOP, TOGGLE_ADD_TIMER,
    TOGGLE_EDIT_TIMER
} from "../types";

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

export const pauseTimer = () => {
    return {
        type: PAUSE
    }
}

export const addTimer = data => {
    return {
        type: ADD_TIMER,
        payload: data
    }
}

export const saveEditData = data => {
    return {
        type: SAVE_EDIT_DATA,
        payload: data
    }
}

export const toggleEditTimer = () => {
    return {
        type: TOGGLE_EDIT_TIMER
    }
}

export const toggleAddTimer = () => {
    return {
        type: TOGGLE_ADD_TIMER
    }
}

export const setDefaultValues = () => {
    return {
        type: SET_DEFAULT_VALUES
    }
}

export const setTimer = data => {
    return {
        type: SET_TIMER,
        payload: data
    }
}