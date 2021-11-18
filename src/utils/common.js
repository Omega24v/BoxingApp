export const getTotalTime = currTimer => {
    if (!currTimer) {return 0}
    return ((currTimer.roundTime + currTimer.restTime)
        * currTimer.rounds
        + currTimer.prepareTime
        - currTimer.restTime)
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