import React from 'react';
import {msToHMS} from "../../utils/timeConverter";
import {getTotalTime} from "../../utils/common";

interface IProps {
  label: string;
  type: string;
  val: number
}

const TimerInfo = ({label, type, val} : IProps) => {

    let formattedVal;

    if (type === 'total') {
        formattedVal = msToHMS(getTotalTime(val))
    } else {
        formattedVal = msToHMS(val)
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
