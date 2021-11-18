import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {connect} from "react-redux";
import {
    addTimer,
    deleteTimer,
    resetTimer,
    setTimer,
    startTimer,
    stopTimer,
    toggleEditTimer
} from "../../store/actions/timerActions";
import {msToMAS} from "../../utils/timeConverter";
import IconClose from '../../icons/IconClose';
import IconEdit from '../../icons/IconEdit';
import './TimersList.sass';

const TimersList = props => {

    const selectTimer = timer => {
        props.stop();
        props.setTimer(timer)
        clearInterval(props.intervalId);
        props.resetTimer();
    }

    const deleteTimer = (e, timer) => {
        e.stopPropagation();
        let filteredTimers = props.timers.filter(item => item.id !== timer.id)
        if (timer.id === props.currTimer.id) {
            props.setTimer(filteredTimers[0]);
        }
        props.deleteTimer(filteredTimers);
    }

    return (
        <div className="d-flex flex-wrap flex-grow-1 gap-3">
            {props.timers.map((timer) =>
                <div 
                    className={`timer-list flex-grow-1 p-2 ${timer.id === props.currTimer.id ? 'active text-danger' : ''}`}
                    onClick={() => selectTimer(timer)}
                    key={timer.id}>
                    <Row>
                        <Col xs={9}>
                            <div className="timer-list__item item-title mb-2">{timer.name}</div>
                            <div className="timer-list__item">
                                <i className="text-success">&#9632;</i> Rounds: {timer.rounds}
                            </div>
                            <div className="timer-list__item">
                                <i className="text-info">&#9632;</i> Round Time: { msToMAS((timer.roundTime)) }
                            </div>
                            <div className="timer-list__item">
                                <i className="text-primary">&#9632;</i> Rest Time: { msToMAS((timer.restTime)) }
                            </div>
                            <div className="timer-list__item">
                                <i className="text-warning">&#9632;</i> Prepare Time: { msToMAS((timer.prepareTime)) }
                            </div>
                        </Col>
                        <Col xs={3} className="d-flex flex-column align-items-end">
                            <span className="mb-2" onClick={() => props.toggleEditTimer()}>
                                <IconEdit  />
                            </span>

                            <span onClick={(e) => deleteTimer(e, timer)}>
                                <IconClose />
                            </span>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currTimer: state.timerReducer.currTimer,
        timers: state.timerReducer.timers,
        intervalId: state.timerReducer.intervalId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        stop: () => dispatch(stopTimer()),
        resetTimer: () => dispatch(resetTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        setTimer: timer => dispatch(setTimer(timer)),
        toggleEditTimer: () => dispatch(toggleEditTimer()),
        deleteTimer: timers => dispatch(deleteTimer(timers)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimersList);