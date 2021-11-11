export const getTotalTime = currTimer => {
    return ((currTimer.roundTime + currTimer.restTime)
        * currTimer.rounds
        + currTimer.prepareTime
        - currTimer.restTime)
}