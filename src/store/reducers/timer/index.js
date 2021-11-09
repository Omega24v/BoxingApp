import {TIMER_DV} from "../../../constatns/timerDefaultValues";
import {SET_DEFAULT_VALUES, START, STOP} from "../../types";

const initialState = {
    isEnabled: false,
    rounds: TIMER_DV.rounds,
    roundTime: TIMER_DV.roundTime, // 3 minutes
    restTime: TIMER_DV.restTime, // 1 minutes
    prepareTime: TIMER_DV.prepareTime // 10 seconds
}

export default function timerReducer(state = initialState, action) {
    switch (action.type) {
        case START:
            return {...state, isEnabled: true}
        case STOP:
            return {...state, isEnabled: false}
        case SET_DEFAULT_VALUES:
            return {...state, isEnabled: false}
        default:
            return state;
    }
}