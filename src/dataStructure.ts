import {TimerDV} from "./constatns/timerDefaultValues";

export interface ITime {
  time: number,
  min: number,
  sec: number,
}

export interface ITimer extends TimerDV{}

export interface IAppState {
  isRunning: boolean,
  isEdit: boolean,
  isAdd: boolean,
  isSound: boolean,
  currentRound: number,
  currentPhase: string,
  intervalCount: number,
  intervalId: number,
  phaseTime: number,
  editTimerData: ITimer,
  currTimer: ITimer,
  timers: ITimer[],
  locale: string,
}

export type FullTimersObj = {
  timer: ITimer
  timers: ITimer[]
}

export type Alert = {
  isActivated: boolean,
  time: number
}

