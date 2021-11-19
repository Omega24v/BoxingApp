import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    countPhaseTime,
    pauseTimer,
    resetTimer,
    setCurrentPhase,
    setCurrentRound,
    setDefaultValues,
    setIntervalCount,
    setIntervalId,
    setPhaseTime,
    startTimer,
    stopTimer,
    toggleAddTimer,
    toggleEditTimer
} from "../../store/actions/timerActions";
import {getPhaseColor, getTotalTime} from "../../utils/common";
import {Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import {PHASES} from "../../constatns/timerDefaultValues";
import {msToHMS} from "../../utils/timeConverter";
import ModalEdit from '../modals/ModalEdit';
import TimersList from '../timersList/TimersList';
import './Timer.sass';
import useSound from 'use-sound';
import bell1x from '../../sounds/bell-1x.mp3';
import bell3x from '../../sounds/bell-3x.mp3';
import warning from '../../sounds/warning.mp3';
import TimerInfo from "../timerInfo/TimerInfo";


const Timer = props => {

    const [playBell1x] = useSound(bell1x);
    const [playBell3x] = useSound(bell3x);
    const [playWarning] = useSound(warning);

    const playSound = cb => {
        if (!cb) {return}
        return props.isSound ? cb() : null;
    }

    const stopResetAndTimer = () => {
        props.stop();
        clearInterval(props.intervalId);
        props.resetTimer();
    }

    useEffect(() => {

        if (preparationFinished()) {
            startFight();
        } else if (isWarningPhase()) {
            startWarning();
        } else if (roundFinished() || warningFinished()) {
            if (isLastRound()) {
                stopFight();
            } else {
                startRest();
            }
        } else if (isRestFinished()) {
            startRound();
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
            if (props.currTimer.prepareTime.time === 0) {
                props.setCurrentPhase(2);
                props.setPhaseTime(props.currTimer.roundTime.time);
            } else {
                props.setCurrentPhase(1);
                props.setPhaseTime(props.currTimer.prepareTime.time);
            }
        }

        const newIntervalId = setInterval(() => {
            props.setIntervalCount(1000);
            props.countPhaseTime(1000);
        }, 1000);

        props.setIntervalId(newIntervalId);
    }

    function preparationFinished() {
        return props.currentPhase === 1 && props.intervalCount === props.currTimer.prepareTime.time
    }

    function startFight() {
        props.setIntervalCount(0);
        props.setPhaseTime(props.currTimer.roundTime.time);
        props.setCurrentPhase(2);
        playSound(playBell1x);
    }

    function isRoundPhase() {
        return props.currentPhase === 2;
    }

    function isLastRound() {
        return props.currentRound === props.currTimer.rounds;
    }

    function startRest() {
        props.setIntervalCount(0);
        props.setPhaseTime(props.currTimer.restTime.time);
        props.setCurrentPhase(4);
        playSound(playBell3x);
    }

    function startRound() {
        props.setIntervalCount(0);
        props.setPhaseTime(props.currTimer.roundTime.time);
        props.setCurrentPhase(2);
        props.setCurrentRound();
        playSound(playBell1x);
    }

    function stopFight() {
        setTimeout(() => {
            stopResetAndTimer();
        }, 0);
    }

    function isWarningPhase() {
        const isWarningTime = props.intervalCount === props.currTimer.roundTime.time - props.currTimer.warningTime.time;
        const isWarningSet = props.currTimer.warningTime.time !== 0;
        return isRoundPhase() && isWarningTime && isWarningSet;
    }

    function startWarning() {
        playSound(playWarning);
        props.setCurrentPhase(3);
    }

    function isRestFinished() {
        const isRestPhase = props.currentPhase === 4;
        const isRestFinished = props.intervalCount === props.currTimer.restTime.time;
        const isRestNotSet = props.currTimer.restTime.time === 0;
        return isRestPhase && (isRestFinished || isRestNotSet);
    }

    function warningFinished() {
        const isWarningPhase = props.currentPhase === 3;
        const isRoundFinished = props.intervalCount === props.currTimer.roundTime.time;
        return isWarningPhase && isRoundFinished;
    }

    function roundFinished() {
        return isRoundPhase() && props.currTimer.roundTime.time === 0
    }

    return (
        <>
            <Row className="mb-4">
                <Col lg={12}><h2 className="timer-title mb-2">{props.currTimer.name}</h2></Col>
                <Col lg={5} className="current-round-col">
                    <div className="timer-big current-round">
                        <span className="timer-big__text">Current Round: </span>
                        <span className="timer-big__count">
                            { props.currentRound > 9 ? props.currentRound : `0${props.currentRound}`}
                        </span>
                        <span className="timer-big__text">OF {props.currTimer.rounds} ROUNDS</span>
                    </div>
                </Col>
                <Col lg={7}>
                    <div className={'timer-big full-time full-time' + getPhaseColor(props.currentPhase)}>
                        <span className="timer-big__text">
                            { props.currentPhase === 0
                                ? 'Full Time:'
                                : `${PHASES[props.currentPhase]} time`
                            }
                        </span>
                        <span className="timer-big__count">
                            { props.currentPhase === 0
                                ? msToHMS(getTotalTime(props.currTimer))
                                : msToHMS(props.phaseTime)
                            }
                        </span>
                    </div>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="d-flex justify-content-between">
                    <TimerInfo type='total' label='Total time' val={props.currTimer}/>
                    <TimerInfo type='warning' label='Prepare time' val={props.currTimer.prepareTime.time}/>
                    <TimerInfo type='info' label='Round Time' val={props.currTimer.roundTime.time}/>
                    <TimerInfo type='primary' label='Rest time' val={props.currTimer.restTime.time}/>
                    <TimerInfo type='warning' label='Last seconds alert' val={props.currTimer.warningTime.time}/>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="timer-actions-btn d-flex justify-content-center">
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
                        <Button variant="warning" onClick={() => {props.toggleEditTimer()}}>Edit/Add</Button>
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
        isSound: state.timerReducer.isSound,
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
        setCurrentRound: () => dispatch(setCurrentRound()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);