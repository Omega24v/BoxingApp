export const getTotalTime = currTimer => {
    if (!currTimer) {return 0}
    return ((currTimer.roundTime.time + currTimer.restTime.time)
        * currTimer.rounds
        + currTimer.prepareTime.time
        - currTimer.restTime.time)
}

export const getPhaseColor = phase => {
    switch (phase) {
        case 1:
            return '__prepare'
        case 2:
            return '__round'
        case 3:
            return '__warning'
        case 4:
            return '__rest'
        default:
            return '__default'
    }
}