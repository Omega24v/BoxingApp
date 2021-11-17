import {getRandomId} from "../utils/getRandomId";
import {TIMER_DV} from "../constatns/timerDefaultValues";

export const defaultTimerModel = {
    id: getRandomId(),
    name: TIMER_DV.name,
    rounds: TIMER_DV.rounds,
    roundTime: TIMER_DV.roundTime,
    roundTimeSec: TIMER_DV.roundTimeSec,
    roundTimeMin: TIMER_DV.roundTimeMin,
    restTime: TIMER_DV.restTime,
    restTimeSec: TIMER_DV.restTimeSec,
    restTimeMin: TIMER_DV.restTimeMin,
    prepareTime: TIMER_DV.prepareTime,
    prepareTimeSec: TIMER_DV.prepareTimeSec,
    prepareTimeMin: TIMER_DV.prepareTimeMin,
    warningTime: TIMER_DV.warningTime,
    warningTimeSec: TIMER_DV.warningTimeSec,
    warningTimeMin: TIMER_DV.warningTimeMin,
    currentRound: TIMER_DV.currentRound,
    fullTime: TIMER_DV.fullTime
}