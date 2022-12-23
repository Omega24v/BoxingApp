
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

export interface TimerState {
  isRunning: boolean,
  isEdit: boolean,
  isAdd: boolean,
  isSound: boolean,
  currentRound: number,
  currentPhase: string,
  intervalCount: number,
  intervalId: number,
  editTimerData: object,
  phaseTime: number,
  currTimer: Timer,
  timers: Timer[],
}

