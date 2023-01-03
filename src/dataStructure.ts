
export interface Time {
  time: number,
  min: number,
  sec: number,
}

export interface Timer {
  id: string,
  name: string,
  rounds: number,
  roundTime: Time,
  restTime: Time,
  prepareTime: Time,
  warningTime: Time,
  innerAlerts: string,
}

export interface AppState {
  isRunning: boolean,
  isEdit: boolean,
  isAdd: boolean,
  isSound: boolean,
  currentRound: number,
  currentPhase: string,
  intervalCount: number,
  intervalId: number,
  editTimerData: Timer,
  phaseTime: number,
  currTimer: Timer,
  timers: Timer[],
  locale: string
}

export type fullTimersObj = {
  timer: Timer
  timers: Timer[]
}

