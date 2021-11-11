import React from 'react';
import {connect} from "react-redux";
import {addTimer, setTimer, startTimer} from "../../store/actions/timerActions";

const TimersList = props => {
    return (
        
        <div>
            {props.timers.map((timer, index) =>
                <div style={{border: '1px solid #777', padding: '7px 10px', cursor: 'pointer'}}
                    onClick={() => props.setTimer(timer)}
                    key={timer.id}>
                    {index + 1} {timer.name} {timer.id === props.currTimer.id ? '*' : ''}
                </div>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currTimer: state.timerReducer.currTimer,
        timers: state.timerReducer.timers,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        setTimer: timer => dispatch(setTimer(timer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimersList);