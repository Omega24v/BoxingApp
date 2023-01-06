import {TIMER_BOXING_AMATEUR, TIMER_DV, TIMER_MMA} from "../constatns/timerDefaultValues";
import {ITimer} from "../dataStructure";

export const defaultCurrTimerModel: ITimer = TIMER_DV;
export const defaultTimersModel: ITimer[] = [TIMER_DV, TIMER_BOXING_AMATEUR, TIMER_MMA];
