import React from 'react';
import { CloseButton, Col, Row } from 'react-bootstrap';
import {connect} from "react-redux";
import {addTimer, resetTimer, setTimer, startTimer, stopTimer} from "../../store/actions/timerActions";

const TimersList = props => {

    const selectTimer = timer => {
        props.stop();
        props.setTimer(timer)
        clearInterval(props.intervalId);
        props.resetTimer();
    }

    return (
        <div className="d-flex flex-wrap gap-3">
            {props.timers.map((timer) =>
                <div 
                    className="timer-list flex-grow-1"
                    style={{border: '1px solid #777', padding: '7px 10px', cursor: 'pointer'}}
                    onClick={() => selectTimer(timer)}
                    key={timer.id}>
                    <Row>
                        <Col lg={9}>
                            <div className={`timer-list__item mb-2 ${timer.id === props.currTimer.id ? 'text-danger' : ''}`}>{timer.name}</div>
                            <div className="timer-list__item text-warning">Rounds: {timer.rounds}</div>
                            <div className="timer-list__item text-warning">Rounds Time: {timer.roundTime}</div>
                            <div className="timer-list__item text-warning">Rest Time: {timer.restTime}</div>
                            <div className="timer-list__item text-warning">Prepare Time: {timer.prepareTime}</div>
                        </Col>
                        <Col lg={3} className="d-flex justify-content-end">
                            <CloseButton variant="white" />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimersList);