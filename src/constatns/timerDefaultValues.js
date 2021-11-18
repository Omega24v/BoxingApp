import {getMinAndSecFromMs} from "../utils/timeConverter";
import {getTotalTime} from "../utils/common";
import {getRandomId} from "../utils/getRandomId";

class TimerDV {
    constructor(
        id,
        name,
        rounds,
        roundTime,
        restTime,
        prepareTime,
        warningTime
    ) {
        this.id = id;
        this.name = name;
        this.isActive = true;
        this.isRunning = false;
        this.rounds = rounds;
        this.roundTime = roundTime;
        this.roundTimeSec = getMinAndSecFromMs(this.roundTime).sec;
        this.roundTimeMin = getMinAndSecFromMs(this.roundTime).min;
        this.restTime = restTime;
        this.restTimeSec = getMinAndSecFromMs(this.restTime).sec;
        this.restTimeMin = getMinAndSecFromMs(this.restTime).min;
        this.prepareTime = prepareTime;
        this.prepareTimeSec = getMinAndSecFromMs(this.prepareTime).sec;
        this.prepareTimeMin = getMinAndSecFromMs(this.prepareTime).min;
        this.warningTime = warningTime;
        this.warningTimeSec = getMinAndSecFromMs(this.warningTime).sec;
        this.warningTimeMin = getMinAndSecFromMs(this.warningTime).min;
        this.currentTime = 0;
        this.currentRound = 1;
        this.remainingTime = 0;
        this.fullTime = getTotalTime({
            roundTime: this.roundTime,
            restTime: this.restTime,
            rounds: this.rounds,
            prepareTime: this.prepareTime,
        })
    }
}

export const TIMER_DV = new TimerDV(
    getRandomId(),
    'Boxing Timer',
    12,
    180000, // 3 minutes = 180000 ms
    60000, // 1 minutes = 60000 ms
    10000, // 10 seconds = 10000 ms
    10000, // 10 seconds = 10000 ms
);
export const TIMER_BOXING_AMATEUR = new TimerDV(
    getRandomId(),
    'Amateur Boxing Timer',
    8,
    120000,
    60000,
    10000,
    10000
);
export const TIMER_MMA = new TimerDV(
    getRandomId(),
    'MMA Timer',
    5,
    300000,
    60000,
    10000,
    10000
);

export const PHASES = {
    0: 'Default',
    1: 'Prepare',
    2: 'Round',
    3: 'Warning',
    4: 'Rest'
}