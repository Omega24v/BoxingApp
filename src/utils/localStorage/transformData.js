import {Time} from "../../constatns/timerDefaultValues";

export const transformData = (data) => {

    if (!data) {return}

    const newTimers = data.timers.map(timer => {
        return {...timer, ...getTransformedFields(timer)
        }
    });

    const newCurrTimer = {...data.currTimer, ...getTransformedFields(data.currTimer)}

    function getTransformedFields(timer) {
        return {
            roundTime: new Time(timer.roundTime.time / 1000),
            restTime: new Time(timer.restTime.time / 1000),
            prepareTime: new Time(timer.prepareTime.time / 1000),
            warningTime: new Time(timer.warningTime.time / 1000)
        }
    }

    return {
        timers: newTimers,
        currTimer: newCurrTimer
    }
}