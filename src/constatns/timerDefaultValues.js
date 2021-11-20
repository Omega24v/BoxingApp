import {getMinAndSecFromMs} from "../utils/timeConverter";
import {getRandomId} from "../utils/getRandomId";

class TimerDV {
    constructor(
        id,
        name,
        rounds,
        roundTime,
        restTime,
        prepareTime,
        warningTime,
    ) {
        this.id = id;
        this.name = name;
        this.rounds = rounds;
        this.roundTime = new Time(roundTime);
        this.restTime = new Time(restTime);
        this.prepareTime = new Time(prepareTime);
        this.warningTime = new Time(warningTime);
        this.innerAlerts = '2, 4, 6';
    }
}

export class Time {
    constructor(
        time
    ) {
        this.time = time * 1000;
    }

    get sec() {
        return this.getSec();
    }

    get min() {
        return this.getMin();
    }

    getSec() {
        return getMinAndSecFromMs(this.time).sec;
    }

    getMin() {
        return getMinAndSecFromMs(this.time).min;
    }

}

export const TIMER_DV = new TimerDV(
    getRandomId(),
    'Boxing Timer',
    12,
    3 * 60,
    60,
    10,
    10,
);

export const TIMER_BOXING_AMATEUR = new TimerDV(
    getRandomId(),
    'Amateur Boxing Timer',
    8,
    2 * 60,
    60,
    10,
    10
);
export const TIMER_MMA = new TimerDV(
    getRandomId(),
    'MMA Timer',
    5,
    5 * 60,
    60,
    10,
    10
);

export const DEFAULT = 'DEFAULT';
export const PREPARE = 'PREPARE';
export const ROUND = 'ROUND';
export const WARNING = 'WARNING';
export const REST = 'REST';

export const PHASES = {
    DEFAULT: 'Default',
    PREPARE: 'Prepare',
    ROUND: 'Round',
    WARNING: 'Warning',
    REST: 'Rest'
}