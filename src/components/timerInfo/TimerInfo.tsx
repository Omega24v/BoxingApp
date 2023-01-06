import React from 'react';
import {msToHMS} from "../../utils/timeConverter";
import {getTotalTime} from "../../utils/common";
import {ITimer} from "../../dataStructure";

interface IProps {
  label: string | React.ReactElement;
  type: string;
  time?: number
  timer?: ITimer
}

const TimerInfo = ({label, type, time, timer} : IProps) => {

    let formattedVal;

    if (type === 'total') {
        formattedVal = msToHMS(getTotalTime(timer!))
    } else {
        formattedVal = msToHMS(time!)
    }

    return (
        <div className="timer-small">
            <span className={`timer-small__count text-${type}`}>
                {formattedVal}
            </span>
            <span className="timer-small__text">{label}</span>
        </div>
    );
};

export default React.memo(TimerInfo);
