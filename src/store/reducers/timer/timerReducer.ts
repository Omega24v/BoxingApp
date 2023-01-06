import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {transformData} from "../../../utils/localStorage/transformData";
import {loadData} from "../../../utils/localStorage/localStorage";
import {defaultCurrTimerModel, defaultTimersModel} from "../../../models/Timer";
import {DEFAULT} from "../../../constatns/timerDefaultValues";
import {IAppState, FullTimersObj, ITimer} from "../../../dataStructure";
import {DEFAULT_LOCALE} from "../../../translation/locales";

const persistedState = transformData(loadData('data'));
const currTimer: ITimer = persistedState?.currTimer ? persistedState.currTimer : defaultCurrTimerModel;
const timers: ITimer[] = persistedState?.timers && persistedState.timers.length > 0
  ? persistedState.timers
  : defaultTimersModel;

export const initialState : IAppState = {
  isRunning: false,
  isEdit: false,
  isAdd: false,
  isSound: true,
  currentRound: 1,
  currentPhase: DEFAULT,
  intervalCount: 0,
  intervalId: 0,
  phaseTime: currTimer.prepareTime.time,
  editTimerData: currTimer,
  currTimer: currTimer,
  timers: timers,
  locale: loadData("lang") || DEFAULT_LOCALE
}

/*
*
Type 'TimerDV | { roundTime: Time; restTime: Time; prepareTime: Time; warningTime: Time; id: string; name: string; rounds: number; phaseTime: number; innerAlerts: string; }'
*  is not assignable to type 'Timer'. Type 'TimerDV' is not assignable to type 'Timer'.
*  Types of property 'phaseTime' are incompatible.
*  Type 'number | undefined' is not assignable to type 'number'.
*  Type 'undefined' is not assignable to type 'number'.  dataStructure.ts(30, 3): The expected type comes from property 'editTimerData' which is declared here on type 'AppState'
*
* */

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

    toggleEditTimer(state, action: PayloadAction<ITimer>) {
      state.isEdit = !state.isEdit;
      state.editTimerData = action.payload;
    },

    toggleAddTimer(state) {
      state.isAdd = !state.isAdd
    },

    onChangeEditData(state, action: PayloadAction<ITimer>) {
      state.editTimerData = action.payload;
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

    addTimer(state, action: PayloadAction<ITimer>) {
      state.currTimer = action.payload;
      state.timers = [...state.timers, action.payload];
      state.isAdd = false;
    },

    deleteTimer(state, action: PayloadAction<ITimer[]>) {
      state.timers = action.payload
    },

    saveEditData(state, action: PayloadAction<FullTimersObj>) {
      state.currTimer = action.payload.timer;
      state.timers = action.payload.timers;
    },

    setTimer(state, action: PayloadAction<ITimer>) {
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
