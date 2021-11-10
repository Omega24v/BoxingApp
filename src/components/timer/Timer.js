import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    toggleEditTimer,
    pauseTimer,
    setDefaultValues,
    startTimer,
    stopTimer,
    toggleAddTimer
} from "../../store/actions/timerActions";
import millisToMinutesAndSeconds from "../../utils/timeConverter";
import {PHASES} from "../../constatns/timerDefaultValues";
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import './Timer.sass';


const Timer = props => {

    const getTotalTime = () => {
        return ((props.currTimer.roundTime + props.currTimer.restTime)
            * props.currTimer.rounds
            + props.currTimer.prepareTime
            - props.currTimer.restTime)
    }

    const totalTime = getTotalTime();
    const [currentPhase, setCurrentPhase] = useState(1);
    const [count, setCount] = useState(0);
    const [phaseTime, setPhaseTime] = useState(props.currTimer.prepareTime);
    const [timerTime, setTimerTime] = useState(totalTime);
    const [intervalId, setIntervalId] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);

    const resetTimer = () => {
        setCount(0);
        setCurrentPhase(1);
        setPhaseTime(props.currTimer.prepareTime);
        setIntervalId(0);
        setTimerTime(totalTime);
        setCurrentRound(1);
    }

    useEffect(() => {

        if (currentPhase === 1 && count === props.currTimer.prepareTime) {
            setCount(0);
            setPhaseTime(props.currTimer.roundTime);
            setCurrentPhase(2);
        } else if (currentPhase === 2 && count === props.currTimer.roundTime - props.currTimer.warningTime) {
            setCurrentPhase(3);
        } else if (currentPhase === 3 && count === props.currTimer.roundTime) {

            if (currentRound === props.currTimer.rounds) {
                props.stop();
                clearInterval(intervalId);
                resetTimer();
            } else {
                setCount(0);
                setPhaseTime(props.currTimer.restTime);
                setCurrentPhase(4);
            }
        } else if (currentPhase === 4 && count === props.currTimer.restTime) {
            setCount(0);
            setPhaseTime(props.currTimer.roundTime);
            setCurrentPhase(2);
            setCurrentRound(prevRound => prevRound + 1);
        }

    }, [count]);

    const handleTimer = () => {

        if (intervalId) {
            props.pause();
            clearInterval(intervalId);
            setIntervalId(0);
            return;
        }

        props.start();

        const newIntervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1000);
            setPhaseTime(prevCount => prevCount - 1000);
            setTimerTime(prevTimerTime => prevTimerTime - 1000);
        }, 1000);

        setIntervalId(newIntervalId);
    }

    return (
        <>
        <Col className="timer py-5 col-lg-12">
            <Row className="mb-4">
                <Col className="col-lg-6">
                    <div className="timer-big current-round">
                        <span className="timer-big__text">Current Round: </span>
                        <span className="timer-big__count">{ currentRound } / { props.currTimer.rounds }</span>
                    </div>
                </Col>
                <Col className="col-lg-6">
                    <div className="timer-big full-time">
                        <span className="timer-big__text">Full Time: </span>
                        <span className="timer-big__count">{millisToMinutesAndSeconds(timerTime)}</span>
                    </div>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="col-lg-12 d-flex justify-content-between">
                    <div className="timer-small">
                        <span className="timer-small__count">Phase</span>
                        <span className="timer-small__text">{ PHASES[currentPhase] }</span>
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count">{ millisToMinutesAndSeconds(phaseTime) }</span>
                        <span className="timer-small__text">Phase Time</span>
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count">{ millisToMinutesAndSeconds(getTotalTime()) }</span>
                        <span className="timer-small__text">Rounds total time</span>
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count">{ millisToMinutesAndSeconds(props.currTimer.restTime) }</span>
                        <span className="timer-small__text">Rounds rest time</span> 
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count">{ millisToMinutesAndSeconds(props.currTimer.prepareTime) }</span>
                        <span className="timer-small__text">Rounds prepare time </span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="col-12 d-flex justify-content-center">
                    <ButtonGroup aria-label="">
                        <Button variant="success" className="btn-start" onClick={handleTimer}>
                            {props.isRunning ? 'Pause' : 'Start'}
                        </Button>
                        <Button variant="warning" className="btn-add" onClick={props.toggleAddTimer}>Add</Button>
                        <Button variant="secondary" className="btn-edit" onClick={props.edit}>Edit</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Col>
        {/* <div> */}
            {/* <div>Current Round: { currentRound } / { props.currTimer.rounds }</div> */}
            {/* <div>Phase: { PHASES[currentPhase] }</div> */}
            {/* <div>Phase Time: { millisToMinutesAndSeconds(phaseTime) }</div> */}
            {/* <div>Full Time: {millisToMinutesAndSeconds(timerTime)}</div> */}
            {/* <button onClick={handleTimer}>
                {props.isRunning ? 'Pause' : 'Start'}
            </button> */}
            {/* <div>
                Rounds total time:
                { millisToMinutesAndSeconds(getTotalTime()) }
            </div> */}
            {/* <div>Rounds rest time: { millisToMinutesAndSeconds(props.currTimer.restTime) }</div>
            <div>Rounds prepare time: { millisToMinutesAndSeconds(props.currTimer.prepareTime) }</div> */}
            {/* <div><button onClick={props.edit}>Edit</button></div>
            <div><button onClick={props.toggleAddTimer}>Add</button></div> */}
        {/* </div> */}
        </>
    );
};

function mapStateToProps(state) {
    return {
        isRunning: state.timerReducer.isRunning,
        currTimer: state.timerReducer.currTimer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        pause: () => dispatch(pauseTimer()),
        stop: () => dispatch(stopTimer()),
        edit: () => dispatch(toggleEditTimer()),
        toggleAddTimer: () => dispatch(toggleAddTimer()),
        setDefaultValues: () => dispatch(setDefaultValues),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);