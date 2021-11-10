export const TIMER_DV = {
    isActive: true,
    isRunning: false,
    rounds: 3,
    roundTime: 6000, // 3 minutes = 180000 ms
    restTime: 4000, // 1 minutes = 60000 ms
    prepareTime: 2000, // 10 seconds = 10000 ms
    warningTime: 2000, // 10 seconds = 10000 ms
    currentTime: 0,
    currentRound: 1,
    remainingTime: 0
}

export const PHASES = {
    1: 'PREPARE',
    2: 'ROUND',
    3: 'WARNING',
    4: 'REST'
}