import {TIMER_DV} from "../../../constatns/timerDefaultValues";
import {
    ADD_TIMER, COUNT_PHASE_TIME, DELETE_TIMER, ON_CHANGE_EDIT_DATA,
    PAUSE, RESET_TIMER,
    SAVE_EDIT_DATA, SET_CURRENT_PHASE, SET_CURRENT_ROUND,
    SET_DEFAULT_VALUES, SET_INTERVAL_COUNT, SET_INTERVAL_ID, SET_PHASE_TIME,
    SET_TIMER,
    START,
    STOP, TOGGLE_ADD_TIMER,
    TOGGLE_EDIT_TIMER, TOGGLE_SOUND
} from "../../types";
import {loadData, setData} from "../../../utils/localStorage/localStorage";
import {defaultCurrTimerModel, defaultTimersModel} from "../../../models/Timer";
import {transformData} from "../../../utils/localStorage/transformData";

const persistedState = transformData(loadData('data'));

const currTimer = persistedState?.currTimer && persistedState?.currTimer !== 'null'
    ? persistedState?.currTimer : defaultCurrTimerModel;
const timers = persistedState?.timers && persistedState?.timers.length > 0
    ? persistedState?.timers
    : defaultTimersModel

const initialState = {
    isRunning: TIMER_DV.isRunning,
    isEdit: false,
    isAdd: false,
    isSound: true,
    currentRound: 1,
    currentPhase: 0,
    intervalCount: 0,
    intervalId: 0,
    editTimerData: {},
    phaseTime: currTimer.prepareTime,
    currTimer: currTimer,
    timers: timers,
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
            return {...state, isEdit: !state.isEdit, editTimerData: state.currTimer}
        case TOGGLE_ADD_TIMER:
            return {...state, isAdd: !state.isAdd}
        case ON_CHANGE_EDIT_DATA:
            return {...state, editTimerData: action.payload}
        case SAVE_EDIT_DATA:
            setData({
                currTimer: action.payload.timer,
                timers: action.payload.timers
            }, 'data');
            return {
                ...state,
                currTimer: action.payload.timer,
                timers: action.payload.timers
            }
        case SET_DEFAULT_VALUES:
            return {...state, isRunning: false}
        case SET_TIMER:
            setData({
                timers: state.timers,
                currTimer: action.payload
            }, 'data');
            return {...state, currTimer: action.payload}
        case SET_INTERVAL_COUNT:
            const val = action.payload === 0 ? 0 : state.intervalCount + action.payload;
            return {...state, intervalCount: val}
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
                isRunning: false,
                currentRound: 1,
                currentPhase: 0,
                phaseTime: state.currTimer.prepareTime,
                intervalCount: 0,
                intervalId: 0,
            }
        case ADD_TIMER:
            setData({
                currTimer: action.payload,
                timers: [...state.timers, action.payload]
            }, 'data');
            return {
                ...state,
                currTimer: action.payload,
                timers: [...state.timers, action.payload],
                isAdd: false
            }
        case TOGGLE_SOUND:
            setData(!state.isSound, 'isSound');
            return {...state, isSound: !state.isSound}
        case DELETE_TIMER:
            setData({
                currTimer: action.payload.length > 0 ? state.currTimer : null,
                timers: action.payload
            }, 'data');
            return {
                ...state,
                timers: action.payload
            }
        default:
            return state;
    }
}