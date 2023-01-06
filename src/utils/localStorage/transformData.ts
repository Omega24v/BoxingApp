import {getTime} from "../../constatns/timerDefaultValues";
import {IAppState, ITimer} from "../../dataStructure";

export const transformData = (data: IAppState) => {

    if (!data) {return}

    const newTimers = data.timers.map(timer => {
        return {...timer, ...getTransformedFields(timer)
        }
    });

    const newCurrTimer = {...data.currTimer, ...getTransformedFields(data.currTimer)}

    function getTransformedFields(timer: ITimer) {
        return {
            roundTime: getTime(timer.roundTime.time / 1000),
            restTime: getTime(timer.restTime.time / 1000),
            prepareTime: getTime(timer.prepareTime.time / 1000),
            warningTime: getTime(timer.warningTime.time / 1000)
        }
    }

    return {
        timers: newTimers,
        currTimer: newCurrTimer
    }
}
