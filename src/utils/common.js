export const getTotalTime = currTimer => {
    return ((currTimer.roundTime + currTimer.restTime)
        * currTimer.rounds
        + currTimer.prepareTime
        - currTimer.restTime)
}

export const getPhaseColor = phase => {
    switch (phase) {
        case 1:
            return '__warning'
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