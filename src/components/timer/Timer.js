import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {pauseTimer, setDefaultValues, startTimer, stopTimer} from "../../store/actions/timerActions";
import millisToMinutesAndSeconds from "../../utils/timeConverter";
import {PHASES} from "../../constatns/timerDefaultValues";
import { Row, Col, Button } from 'react-bootstrap';
import './Timer.sass';


const Timer = props => {

    const getTotalTime = () => {
        return (props.roundTime + props.restTime) * props.rounds + props.prepareTime - props.restTime
    }

    const totalTime = getTotalTime();
    const [currentPhase, setCurrentPhase] = useState(1);
    const [count, setCount] = useState(0);
    const [phaseTime, setPhaseTime] = useState(props.prepareTime);
    const [timerTime, setTimerTime] = useState(totalTime);
    const [intervalId, setIntervalId] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);

    const resetTimer = () => {
        setCount(0);
        setCurrentPhase(1);
        setPhaseTime(props.prepareTime);
        setIntervalId(0);
        setTimerTime(totalTime);
        setCurrentRound(1);
    }

    useEffect(() => {

        if (currentPhase === 1 && count === props.prepareTime) {
            setCount(0);
            setPhaseTime(props.roundTime);
            setCurrentPhase(2);
        } else if (currentPhase === 2 && count === props.roundTime - props.warningTime) {
            setCurrentPhase(3);
        } else if (currentPhase === 3 && count === props.roundTime) {

            if (currentRound === props.rounds) {
                props.stop();
                clearInterval(intervalId);
                resetTimer();
            } else {
                setCount(0);
                setPhaseTime(props.restTime);
                setCurrentPhase(4);
            }
        } else if (currentPhase === 4 && count === props.restTime) {
            setCount(0);
            setPhaseTime(props.roundTime);
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
        <Col className="timer py-5 col-lg-12">
            <Row className="mb-4">
                <Col className="col-lg-6">
                    <div className="timer-big current-round">
                        <span className="timer-big__text">Current Round: </span>
                        <span className="timer-big__count">{ currentRound }/{ props.rounds }</span>
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
                        <span className="timer-small__count">{ millisToMinutesAndSeconds(props.restTime) }</span>
                        <span className="timer-small__text">Rounds rest time</span> 
                    </div>
                    <div className="timer-small">
                        <span className="timer-small__count">{ millisToMinutesAndSeconds(props.prepareTime) }</span>
                        <span className="timer-small__text">Rounds prepare time </span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="col-12 d-flex justify-content-center">
                    <Button variant="success" className="btn-start" onClick={handleTimer}>
                        {props.isRunning ? 'Pause' : 'Start'}
                    </Button>
                </Col>
            </Row>
        </Col>
    );
};

function mapStateToProps(state) {
    return {
        isRunning: state.timerReducer.isRunning,
        rounds: state.timerReducer.rounds,
        roundTime: state.timerReducer.roundTime,
        restTime: state.timerReducer.restTime,
        prepareTime:  state.timerReducer.prepareTime,
        warningTime:  state.timerReducer.warningTime
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        pause: () => dispatch(pauseTimer()),
        stop: () => dispatch(stopTimer()),
        setDefaultValues: () => dispatch(setDefaultValues),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);