import {
    ADD_TIMER, COUNT_PHASE_TIME, ON_CHANGE_EDIT_DATA,
    PAUSE, RESET_TIMER,
    SAVE_EDIT_DATA, SET_CURRENT_PHASE, SET_CURRENT_ROUND,
    SET_DEFAULT_VALUES, SET_FULL_TIME, SET_INTERVAL_COUNT, SET_INTERVAL_ID, SET_PHASE_TIME,
    SET_TIMER,
    START,
    STOP, TOGGLE_ADD_TIMER,
    TOGGLE_EDIT_TIMER, TOGGLE_SOUND
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

export const toggleSound = () => {
    return {
        type: TOGGLE_SOUND
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

export const resetTimer = () => {
    return {
        type: RESET_TIMER
    }
}

export const setIntervalCount = data => {
    return {
        type: SET_INTERVAL_COUNT,
        payload: data
    }
}

export const setIntervalId = data => {
    return {
        type: SET_INTERVAL_ID,
        payload: data
    }
}

export const setPhaseTime = data => {
    return {
        type: SET_PHASE_TIME,
        payload: data
    }
}

export const countPhaseTime = data => {
    return {
        type: COUNT_PHASE_TIME,
        payload: data
    }
}

export const setCurrentPhase = data => {
    return {
        type: SET_CURRENT_PHASE,
        payload: data
    }
}

export const setCurrentRound = () => {
    return {
        type: SET_CURRENT_ROUND,
    }
}

export const setFullTime = data => {
    return {
        type: SET_FULL_TIME,
        payload: data
    }
}

export const onChangeEditData = data => {
    return {
        type: ON_CHANGE_EDIT_DATA,
        payload: data
    }
}