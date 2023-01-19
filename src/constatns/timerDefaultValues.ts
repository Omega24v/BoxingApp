import {getMinAndSecFromMs} from "../utils/timeConverter";
import {getRandomId} from "../utils/getRandomId";
import {ITime} from "../dataStructure";

export class TimerDV {

    roundTime: ITime;
    restTime: ITime;
    prepareTime: ITime;
    warningTime: ITime;

    constructor(
        public id: string,
        public name: string,
        public rounds: number,
        public roundTimeSec?: number,
        public restTimeSec?: number,
        public prepareTimeSec?: number,
        public warningTimeSec?: number,
        public phaseTime?: number,
        public innerAlerts?: string,
    ) {
        this.id = id;
        this.name = name;
        this.rounds = rounds;
        this.roundTime = getTime(roundTimeSec || 0);
        this.restTime = getTime(restTimeSec || 0);
        this.prepareTime = getTime(prepareTimeSec || 0);
        this.warningTime = getTime(warningTimeSec || 0);
        this.phaseTime = this.prepareTime.time;
        this.innerAlerts = '';
    }
}

export function getTime (time: number): ITime {
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

export const TEST_TIMER2 = new TimerDV(
  getRandomId(),
  'Test Timer',
  2,
  5,
  5,
  5,
  2,
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

export const TEST_TIMER = {...TIMER_EMPTY,
    roundTime: {
        ...getTime(30)
    },
    restTime: {
        ...getTime(10)
    },
    prepareTime: {
        ...getTime(5)
    },
    warningTime: {
        ...getTime(0)
    },
    phaseTime: 0,
    rounds: 12,
    innerAlerts: ''
}
