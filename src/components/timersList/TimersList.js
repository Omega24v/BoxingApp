import React, {useState} from 'react';
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
import {msToHMS} from "../../utils/timeConverter";
import IconClose from '../../icons/IconClose';
import IconEdit from '../../icons/IconEdit';
import './TimersList.sass';
import ConfirmAlert from "../UI/confirmAlert/ConfirmAlert";

const TimersList = props => {

    const [isDelete, setIsDelete] = useState(false);
    const [timerToDelete, setTimerToDelete] = useState(null);

    const selectTimer = timer => {
        props.stop();
        props.setTimer(timer)
        clearInterval(props.intervalId);
        props.resetTimer();
    }

    const showDeleteConfirm = (e, timer) => {
        e.stopPropagation();
        setIsDelete(true);
        setTimerToDelete(timer);
    }

    const deleteTimer = (e, timer) => {

        let filteredTimers = props.timers.filter(item => item.id !== timer.id)
        if (timer.id === props.currTimer.id) {
            props.setTimer(filteredTimers[0]);
        }
        props.deleteTimer(filteredTimers);
        setIsDelete(false);
        setTimerToDelete(null);
    }

    return (
        <div className="d-flex flex-wrap gap-3">
            {props.timers.map((timer) =>
                <div 
                    className={`timer-list flex-grow-1 flex-md-grow-0 p-2 ${timer.id === props.currTimer.id ? 'active text-danger' : ''}`}
                    onClick={() => selectTimer(timer)}
                    key={timer.id}>
                    <Row>
                        <Col xs={10}>
                            <div className="timer-list__item item-title mb-2">{timer.name}</div>
                            <div className="timer-list__item">
                                <i className="text-success">&#9632;</i> Rounds: {timer.rounds}
                            </div>
                            <div className="timer-list__item">
                                <i className="text-warning">&#9632;</i> Prepare Time: { msToHMS((timer.prepareTime)) }
                            </div>
                            <div className="timer-list__item">
                                <i className="text-info">&#9632;</i> Round Time: { msToHMS((timer.roundTime)) }
                            </div>
                            <div className="timer-list__item">
                                <i className="text-primary">&#9632;</i> Rest Time: { msToHMS((timer.restTime)) }
                            </div>
                            <div className="timer-list__item">
                                <i className="text-warning">&#9632;</i> Last seconds alert: { msToHMS((timer.warningTime)) }
                            </div>
                        </Col>
                        <Col xs={2} className="d-flex flex-column align-items-end">
                            <span className="mb-2" onClick={() => {props.setTimer(timer); props.toggleEditTimer()}}>
                                <IconEdit  />
                            </span>
                            {
                                props.timers.length > 1
                                ?
                                    <span onClick={(e) => showDeleteConfirm(e, timer)}>
                                        <IconClose />
                                    </span>
                                : ''
                            }
                        </Col>
                    </Row>
                </div>
            )}
            <ConfirmAlert
                show={isDelete}
                itemName={timerToDelete ? timerToDelete.name : ''}
                onHide={() => setIsDelete(false)}
                confirmAction={e => deleteTimer(e, timerToDelete)}
            />
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