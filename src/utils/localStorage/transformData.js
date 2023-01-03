import {getTime} from "../../constatns/timerDefaultValues";

export const transformData = (data) => {

    if (!data) {return}

    const newTimers = data.timers.map(timer => {
        return {...timer, ...getTransformedFields(timer)
        }
    });

    const newCurrTimer = {...data.currTimer, ...getTransformedFields(data.currTimer)}

    function getTransformedFields(timer) {
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
