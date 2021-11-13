export const TIMER_DV = {
    name: 'Default Timer',
    isActive: true,
    isRunning: false,
    rounds: 3,
    roundTime: 3000, // 3 minutes = 180000 ms
    roundTimeSec: 3,
    roundTimeMin: 0,
    restTime: 2000, // 1 minutes = 60000 ms
    restTimeSec: 2,
    restTimeMin: 0,
    prepareTime: 1000, // 10 seconds = 10000 ms
    prepareTimeSec: 1,
    prepareTimeMin: 0,
    warningTime: 2000, // 10 seconds = 10000 ms
    warningTimeSec: 2,
    warningTimeMin: 0,
    currentTime: 0,
    currentRound: 1,
    remainingTime: 0
}

export const PHASES = {
    0: 'Default',
    1: 'Prepare',
    2: 'Round',
    3: 'Warning',
    4: 'Rest'
}