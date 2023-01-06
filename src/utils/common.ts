import {PREPARE, REST, ROUND, WARNING} from "../constatns/timerDefaultValues";
import {ITimer} from "../dataStructure";

export const getTotalTime = (currTimer: ITimer) => {
    if (!currTimer) {return 0}
    return ((currTimer.roundTime.time + currTimer.restTime.time)
        * currTimer.rounds
        + currTimer.prepareTime.time
        - currTimer.restTime.time)
}

export const getPhaseColor = (phase: string): string => {
    switch (phase) {
        case PREPARE:
            return '__prepare'
        case ROUND:
            return '__round'
        case WARNING:
            return '__warning'
        case REST:
            return '__rest'
        default:
            return '__default'
    }
}
