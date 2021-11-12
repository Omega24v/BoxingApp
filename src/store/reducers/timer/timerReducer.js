import {TIMER_DV} from "../../../constatns/timerDefaultValues";
import {
    ADD_TIMER, COUNT_PHASE_TIME,
    PAUSE, RESET_TIMER,
    SAVE_EDIT_DATA, SET_CURRENT_PHASE, SET_CURRENT_ROUND,
    SET_DEFAULT_VALUES, SET_FULL_TIME, SET_INTERVAL_COUNT, SET_INTERVAL_ID, SET_PHASE_TIME,
    SET_TIMER,
    START,
    STOP, TOGGLE_ADD_TIMER,
    TOGGLE_EDIT_TIMER
} from "../../types";
import {getRandomId} from "../../../utils/getRandomId";
import {getTotalTime} from "../../../utils/common";
import {loadData, setData} from "../../../utils/localStorage/localStorage";

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

const persistedState = loadData('data');

const initialState = {
    isRunning: TIMER_DV.isRunning,
    isEdit: false,
    isAdd: false,
    currentRound: 1,
    currentPhase: 1,
    phaseTime: defaultTimer.prepareTime,
    fullTime: getTotalTime(defaultTimer),
    intervalCount: 0,
    intervalId: 0,
    currTimer: persistedState?.timers[0] || defaultTimer,
    timers: persistedState?.timers || [defaultTimer],
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
            setData({timers: action.payload.timers}, 'data');
            return {...state, currTimer: action.payload.timer, timers: action.payload.timers}
        case SET_DEFAULT_VALUES:
            return {...state, isRunning: false}
        case SET_TIMER:
            return {...state, currTimer: action.payload}
        case SET_INTERVAL_COUNT:
            const val = action.payload === 0 ? 0 : state.intervalCount + action.payload;
            return {...state, intervalCount: val}
        case SET_FULL_TIME:
            return {...state, fullTime: state.fullTime - action.payload}
        case SET_PHASE_TIME:
            return {...state, phaseTime: action.payload}
        case COUNT_PHASE_TIME:
            return {...state, phaseTime: state.phaseTime - action.payload}
        case SET_INTERVAL_ID:
            return {...state, intervalId: action.payload}
        case SET_CURRENT_PHASE:
            return {...state, currentPhase: action.payload}
        case SET_CURRENT_ROUND:
            return {...state, currentRound: state.currentRound + 1}
        case RESET_TIMER:
            return {
                ...state,
                currentRound: 1,
                currentPhase: 1,
                phaseTime: defaultTimer.prepareTime,
                fullTime: getTotalTime(defaultTimer),
                intervalCount: 0,
                intervalId: 0,
            }
        case ADD_TIMER:
            setData({timers: [...state.timers, action.payload]}, 'data');
            return {...state, timers: [...state.timers, action.payload], isAdd: false}
        default:
            return state;
    }
}