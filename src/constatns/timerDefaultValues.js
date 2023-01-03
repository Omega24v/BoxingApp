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
        this.roundTime = getTime(roundTime);
        this.restTime = getTime(restTime);
        this.prepareTime = getTime(prepareTime);
        this.warningTime = getTime(warningTime);
        this.innerAlerts = '';
    }
}

export function getTime (time) {
    time *= 1000;
    return {
        time: time,
        sec: getMinAndSecFromMs(time).sec,
        min: getMinAndSecFromMs(time).min
    }
}

export const TIMER_EMPTY = new TimerDV(
  '',
  '',
  0,
  0,
  0,
  0,
  0,
);

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
