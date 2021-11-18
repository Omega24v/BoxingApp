import React from 'react';
import {msToMAS} from "../../utils/timeConverter";
import {getTotalTime} from "../../utils/common";

const TimerInfo = ({label, type, val}) => {

    let formattedVal;

    if (type === 'total') {
        formattedVal = msToMAS(getTotalTime(val))
    } else {
        formattedVal = msToMAS(val)
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