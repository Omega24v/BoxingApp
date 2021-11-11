import {TIMER_DV} from "../../../constatns/timerDefaultValues";
import {
    ADD_TIMER,
    PAUSE,
    SAVE_EDIT_DATA,
    SET_DEFAULT_VALUES,
    SET_TIMER,
    START,
    STOP, TOGGLE_ADD_TIMER,
    TOGGLE_EDIT_TIMER
} from "../../types";
import {getRandomId} from "../../../utils/getRandomId";

const defaultTimer = {
    id: getRandomId(),
    name: TIMER_DV.name,
    rounds: TIMER_DV.rounds,
    roundTime: TIMER_DV.roundTime,
    restTime: TIMER_DV.restTime,
    prepareTime: TIMER_DV.prepareTime,
    warningTime: TIMER_DV.warningTime,
    currentRound: TIMER_DV.currentRound
}

const initialState = {
    isRunning: TIMER_DV.isRunning,
    isEdit: false,
    isAdd: false,
    currTimer: defaultTimer,
    timers: [defaultTimer],
}

export default function timerReducer(state = initialState, action) {

    switch (action.type) {
        case START:
            return {...state, isRunning: true}
        case STOP:
            return {...state, isRunning: false}
        case PAUSE:
            return {...state, isRunning: false}
        case TOGGLE_EDIT_TIMER:
            return {...state, isEdit: !state.isEdit}
        case TOGGLE_ADD_TIMER:
            return {...state, isAdd: !state.isAdd}
        case SAVE_EDIT_DATA:
            return {...state, currTimer: action.payload.timer, timers: action.payload.timers}
        case SET_DEFAULT_VALUES:
            return {...state, isRunning: false}
        case SET_TIMER:
            return {...state, currTimer: action.payload}
        case ADD_TIMER:
            return {...state, timers: [...state.timers, action.payload], isAdd: false}
        default:
            return state;
    }
}