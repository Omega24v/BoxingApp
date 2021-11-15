import {getMinAndSecFromMs} from "../utils/timeConverter";

class TimerDV {
    constructor() {
        this.name = 'Default Timer';
        this.isActive = true;
        this.isRunning = false;
        this.rounds = 3;
        this.roundTime = 180000; // 3 minutes = 180000 ms
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
        this.alerts = [ // time in seconds
            {
                id: 1,
                time: 10,
                name: 'alert1',
                label: 'First',
                isActivated: false,
                isShown: true
            },
            {
                id: 2,
                time: 20,
                name: 'alert2',
                label: 'Second',
                isActivated: false,
                isShown: true
            },
            {
                id: 3,
                time: 30,
                name: 'alert3',
                label: 'Third',
                isActivated: false,
                isShown: true
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