import {createSlice} from "@reduxjs/toolkit";
import {transformData} from "../../../utils/localStorage/transformData";
import {loadData, setData} from "../../../utils/localStorage/localStorage";
import {defaultCurrTimerModel, defaultTimersModel} from "../../../models/Timer";
import {DEFAULT, TIMER_DV} from "../../../constatns/timerDefaultValues";
import {cloneDeep} from "lodash";

const persistedState = transformData(loadData('data'));
const currTimer = persistedState?.currTimer && persistedState?.currTimer !== 'null'
  ? persistedState?.currTimer : defaultCurrTimerModel;
const timers = persistedState?.timers && persistedState?.timers.length > 0
  ? persistedState?.timers
  : defaultTimersModel

export const initialState = {
  isRunning: TIMER_DV.isRunning,
  isEdit: false,
  isAdd: false,
  isSound: true,
  currentRound: 1,
  currentPhase: DEFAULT,
  intervalCount: 0,
  intervalId: 0,
  editTimerData: {},
  phaseTime: currTimer.prepareTime,
  currTimer: currTimer,
  timers: timers,
}

const timerReducer = createSlice({
  name: 'timerReducer',
  initialState,
  reducers: {
    startTimer(state) {
      state.isRunning = true
    },

    stopTimer(state) {
      state.isRunning = false
    },

    pauseTimer(state) {
      state.isRunning = false
    },

    toggleEditTimer(state) {
      state.isEdit = !state.isEdit;
      state.editTimerData = cloneDeep(state.currTimer)
    },

    toggleAddTimer(state) {
      state.isAdd = !state.isAdd
    },

    onChangeEditData(state, action) {
      state.editTimerData = cloneDeep(action.payload)
    },

    setDefaultValues(state) {
      state.isRunning = false
    },

    setIntervalCount(state, action) {
      state.intervalCount = action.payload === 0 ? 0 : state.intervalCount + action.payload
    },

    toggleSound(state) {
      setData(!state.isSound, 'isSound');
      state.isSound = !state.isSound
    },

    setIntervalId(state, action) {
      state.intervalId = action.payload
    },

    setPhaseTime(state, action) {
      state.phaseTime = action.payload
    },

    countPhaseTime(state, action) {
      state.phaseTime = state.phaseTime - action.payload
    },

    setCurrentPhase(state, action) {
      state.currentPhase = action.payload
    },

    setCurrentRound(state) {
      state.currentRound = state.currentRound + 1
    },

    resetTimer(state) {
      state.isRunning = false;
      state.currentRound = 1;
      state.currentPhase = DEFAULT;
      state.phaseTime = state.currTimer.prepareTime;
      state.intervalCount = 0;
      state.intervalId = 0;
    },

    addTimer(state, action) {
      setData({
        currTimer: action.payload,
        timers: [...state.timers, action.payload]
      }, 'data');
      state.currTimer = action.payload;
      state.timers = [...state.timers, action.payload];
      state.isAdd = false;
    },

    deleteTimer(state, action) {
      setData({
        currTimer: action.payload.length > 0 ? state.currTimer : null,
        timers: action.payload
      }, 'data');
      state.timers = action.payload
    },

    saveEditData(state, action) {
      setData({
        currTimer: action.payload.timer,
        timers: action.payload.timers
      }, 'data');
      state.currTimer = action.payload.timer;
      state.timers = action.payload.timers;
    },

    setTimer(state, action) {
      setData({
        timers: state.timers,
        currTimer: action.payload
      }, 'data');
      state.currTimer = action.payload;
    }
  }
});

export default timerReducer.reducer;
export const {
  startTimer,
  stopTimer,
  pauseTimer,
  addTimer,
  saveEditData,
  toggleEditTimer,
  toggleAddTimer,
  toggleSound,
  setDefaultValues,
  setTimer,
  resetTimer,
  setIntervalCount,
  setIntervalId,
  setPhaseTime,
  countPhaseTime,
  setCurrentPhase,
  setCurrentRound,
  onChangeEditData,
  deleteTimer,
} = timerReducer.actions
