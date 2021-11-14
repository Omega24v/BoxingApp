import {getMinAndSecFromMs} from "../utils/timeConverter";

class TimerDV {
    constructor() {
        this.name = 'Default Timer';
        this.isActive = true;
        this.isRunning = false;
        this.rounds = 3;
        this.roundTime = 20000; // 3 minutes = 180000 ms
        this.roundTimeSec = getMinAndSecFromMs(this.roundTime).sec;
        this.roundTimeMin = getMinAndSecFromMs(this.roundTime).min;
        this.restTime = 2000; // 1 minutes = 60000 ms
        this.restTimeSec = getMinAndSecFromMs(this.restTime).sec;
        this.restTimeMin = getMinAndSecFromMs(this.restTime).min;
        this.prepareTime = 1000; // 10 seconds = 10000 ms
        this.prepareTimeSec = getMinAndSecFromMs(this.prepareTime).sec;
        this.prepareTimeMin = getMinAndSecFromMs(this.prepareTime).min;
        this.warningTime = 2000; // 10 seconds = 10000 ms
        this.warningTimeSec = getMinAndSecFromMs(this.warningTime).sec;
        this.warningTimeMin = getMinAndSecFromMs(this.warningTime).min;
        this.currentTime = 0;
        this.currentRound = 1;
        this.remainingTime = 0;
        this.alerts = [
            {
                time: 5,
                label: 'Speed stage',
                isActive: false
            },
            {
                time: 0,
                label: 'Slow stage',
                isActive: false
            }
        ]
    }
}

export const TIMER_DV = new TimerDV();

export const PHASES = {
    0: 'Default',
    1: 'Prepare',
    2: 'Round',
    3: 'Warning',
    4: 'Rest'
}