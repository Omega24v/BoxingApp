import {TIMER_DV} from "../../../constatns/timerDefaultValues";
import {PAUSE, SET_DEFAULT_VALUES, START, STOP} from "../../types";

const initialState = {
    isRunning: TIMER_DV.isRunning,
    rounds: TIMER_DV.rounds,
    roundTime: TIMER_DV.roundTime,
    restTime: TIMER_DV.restTime,
    prepareTime: TIMER_DV.prepareTime,
    warningTime: TIMER_DV.warningTime,
    currentRound: TIMER_DV.currentRound
}

export default function timerReducer(state = initialState, action) {

    switch (action.type) {
        case START:
            return {...state, isRunning: true}
        case STOP:
            return {...state, isRunning: false}
        case PAUSE:
            return {...state, isRunning: false}
        case SET_DEFAULT_VALUES:
            return {...state, isRunning: false}
        default:
            return state;
    }
}