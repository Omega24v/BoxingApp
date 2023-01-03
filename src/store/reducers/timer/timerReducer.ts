import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {transformData} from "../../../utils/localStorage/transformData";
import {loadData} from "../../../utils/localStorage/localStorage";
import {defaultCurrTimerModel, defaultTimersModel} from "../../../models/Timer";
import {DEFAULT} from "../../../constatns/timerDefaultValues";
import {AppState, fullTimersObj, Timer} from "../../../dataStructure";
import {DEFAULT_LOCALE} from "../../../translation/locales";

const persistedState = transformData(loadData('data'));
const currTimer = persistedState?.currTimer && persistedState?.currTimer !== 'null'
  ? persistedState?.currTimer : defaultCurrTimerModel;
const timers = persistedState?.timers && persistedState?.timers.length > 0
  ? persistedState?.timers
  : defaultTimersModel;

export const initialState : AppState = {
  isRunning: false,
  isEdit: false,
  isAdd: false,
  isSound: true,
  currentRound: 1,
  currentPhase: DEFAULT,
  intervalCount: 0,
  intervalId: 0,
  editTimerData: currTimer,
  phaseTime: currTimer.prepareTime,
  currTimer: currTimer,
  timers: timers,
  locale: loadData("lang") || DEFAULT_LOCALE
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

    toggleEditTimer(state, action: PayloadAction<Timer>) {
      state.isEdit = !state.isEdit;
      state.editTimerData = action.payload;
    },

    toggleAddTimer(state) {
      state.isAdd = !state.isAdd
    },

    onChangeEditData(state, action: PayloadAction<Timer>) {
      state.editTimerData = action.payload;
    },

    setDefaultValues(state) {
      state.isRunning = false
    },

    setIntervalCount(state, action: PayloadAction<number>) {
      state.intervalCount = action.payload === 0 ? 0 : state.intervalCount + action.payload
    },

    toggleSound(state) {
      state.isSound = !state.isSound
    },

    setIntervalId(state, action: PayloadAction<number>) {
      state.intervalId = action.payload
    },

    setPhaseTime(state, action: PayloadAction<number>) {
      state.phaseTime = action.payload
    },

    countPhaseTime(state, action: PayloadAction<number>) {
      state.phaseTime -= action.payload
    },

    setCurrentPhase(state, action: PayloadAction<string>) {
      state.currentPhase = action.payload
    },

    setCurrentRound(state) {
      state.currentRound = state.currentRound + 1
    },

    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
    },

    resetTimer(state) {
      state.isRunning = false;
      state.currentRound = 1;
      state.currentPhase = DEFAULT;
      state.phaseTime = state.currTimer.prepareTime.time;
      state.intervalCount = 0;
      state.intervalId = 0;
    },

    addTimer(state, action: PayloadAction<Timer>) {
      state.currTimer = action.payload;
      state.timers = [...state.timers, action.payload];
      state.isAdd = false;
    },

    deleteTimer(state, action: PayloadAction<Timer[]>) {
      state.timers = action.payload
    },

    saveEditData(state, action: PayloadAction<fullTimersObj>) {
      state.currTimer = action.payload.timer;
      state.timers = action.payload.timers;
    },

    setTimer(state, action: PayloadAction<Timer>) {
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
  setLocale,
} = timerReducer.actions
