import React, { useEffect } from 'react';
import { connect } from "react-redux";
import {
    toggleEditTimer,
    pauseTimer,
    setDefaultValues,
    startTimer,
    stopTimer,
    toggleAddTimer,
    resetTimer,
    setIntervalCount,
    setPhaseTime,
    setCurrentPhase,
    setCurrentRound,
    setIntervalId,
    setFullTime, countPhaseTime
} from "../../store/actions/timerActions";
import {getPhaseColor, getTotalTime} from "../../utils/common";
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { PHASES } from "../../constatns/timerDefaultValues";
import {msToMAS} from "../../utils/timeConverter";
import ModalEdit from '../modal/ModalEdit';
import TimersList from '../timersList/TimersList';
import './Timer.sass';


const Timer = props => {

    const stopResetAndTimer = () => {
        props.stop();
        clearInterval(props.intervalId);
        props.resetTimer();
    }

    useEffect(() => {

        if (props.currentPhase === 1 && props.intervalCount === props.currTimer.prepareTime) {
            props.setIntervalCount(0);
            props.setPhaseTime(props.currTimer.roundTime);
            props.setCurrentPhase(2);
        } else if (props.currentPhase === 2 && props.intervalCount === props.currTimer.roundTime - props.currTimer.warningTime) {
            props.setCurrentPhase(3);
        } else if (props.currentPhase === 3 && props.intervalCount === props.currTimer.roundTime) {

            if (props.currentRound === props.currTimer.rounds) {
                setTimeout(() => {
                    stopResetAndTimer();
                }, 0);
            } else {
                props.setIntervalCount(0);
                props.setPhaseTime(props.currTimer.restTime);
                props.setCurrentPhase(4);
            }
        } else if (props.currentPhase === 4 && props.intervalCount === props.currTimer.restTime) {
            props.setIntervalCount(0);
            props.setPhaseTime(props.currTimer.roundTime);
            props.setCurrentPhase(2);
            props.setCurrentRound();
        }

    }, [props.intervalCount]);

    const handleTimer = () => {

        if (props.intervalId) {
            props.pause();
            clearInterval(props.intervalId);
            props.setIntervalId(0);
            return;
        }

        props.start();

        if (props.currentPhase === 0) {
            props.setCurrentPhase(1);
        }

        const newIntervalId = setInterval(() => {
            props.setIntervalCount(1000);
            props.countPhaseTime(1000);
            props.setFullTime(1000);
        }, 1000);

        props.setIntervalId(newIntervalId);
    }

    return (
        <>
            <Row className="mb-4">
                <Col lg={12}><h2 className="timer-title m-2">{props.currTimer.name}</h2></Col>
                <Col lg={5}>
                    <div className="timer-big current-round">
                        <span className="timer-big__text">Current Round: </span>
                        <span className="timer-big__count">{ props.currentRound }</span>
                    </div>
                </Col>
                <Col lg={7}>
                    <div className={'timer-big full-time full-time' + getPhaseColor(props.currentPhase)}>
                        <span className="timer-big__text">
                            { props.isRunning
                                ? `${PHASES[props.currentPhase]} time`
                                : 'Full Time:'
                            }
                        </span>
                        <span className="timer-big__count">
                            { props.isRunning
                            ? msToMAS(props.phaseTime)
                            : msToMAS(props.fullTime)
                            }
                        </span>
                    </div>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="d-flex justify-content-between">
                    <div className="timer-small">
                        <span className="timer-small__count text-danger">{ PHASES[props.currentPhase] }</span>
                        <span className="timer-small__text">Phase</span>
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count text-info">{ msToMAS(props.phaseTime) }</span>
                        <span className="timer-small__text">Phase Time</span>
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count text-success">{ msToMAS(getTotalTime(props.currTimer)) }</span>
                        <span className="timer-small__text">Rounds total time</span>
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count text-primary">{ msToMAS(props.currTimer.restTime) }</span>
                        <span className="timer-small__text">Rounds rest time</span>
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count text-warning">{ msToMAS(props.currTimer.prepareTime) }</span>
                        <span className="timer-small__text">Rounds prepare time</span>
                    </div>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="d-flex justify-content-center">
                    <ButtonGroup aria-label="timer buttons">
                        {props.isRunning
                            ?
                            <Button variant="danger"
                                    className="me-3"
                                    onClick={stopResetAndTimer}>
                                Stop
                            </Button>
                            :
                            ''
                        }
                        <Button variant="success" className="me-3 btn-start" onClick={handleTimer}>
                            {props.isRunning ? 'Pause' : 'Start'}
                        </Button>
                        <Button variant="warning" onClick={() => {props.toggleEditTimer()}}>Edit</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TimersList/>
                </Col>
            </Row>

            <ModalEdit
                show={props.isEdit}
                timerName={props.currTimer.name}
                onHide={() => props.toggleEditTimer()}
            />
        </>
    );
};

function mapStateToProps(state) {
    return {
        isEdit: state.timerReducer.isEdit,
        isRunning: state.timerReducer.isRunning,
        currTimer: state.timerReducer.currTimer,
        currentRound: state.timerReducer.currentRound,
        currentPhase: state.timerReducer.currentPhase,
        phaseTime: state.timerReducer.phaseTime,
        fullTime: state.timerReducer.fullTime,
        intervalCount: state.timerReducer.intervalCount,
        intervalId: state.timerReducer.intervalId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        pause: () => dispatch(pauseTimer()),
        stop: () => dispatch(stopTimer()),
        toggleEditTimer: () => dispatch(toggleEditTimer()),
        toggleAddTimer: () => dispatch(toggleAddTimer()),
        setDefaultValues: () => dispatch(setDefaultValues()),
        resetTimer: () => dispatch(resetTimer()),
        setIntervalCount: count => dispatch(setIntervalCount(count)),
        setIntervalId: id => dispatch(setIntervalId(id)),
        setPhaseTime: time => dispatch(setPhaseTime(time)),
        countPhaseTime: time => dispatch(countPhaseTime(time)),
        setCurrentPhase: phase => dispatch(setCurrentPhase(phase)),
        setCurrentRound: round => dispatch(setCurrentRound(round)),
        setFullTime: fullTime => dispatch(setFullTime(fullTime)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);