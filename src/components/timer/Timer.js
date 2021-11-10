import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {toggleEditTimer, pauseTimer, setDefaultValues, startTimer, stopTimer} from "../../store/actions/timerActions";
import millisToMinutesAndSeconds from "../../utils/timeConverter";
import {PHASES} from "../../constatns/timerDefaultValues";


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
        <div>
            <div>Current Round: { currentRound } / { props.currTimer.rounds }</div>
            <div>Phase: { PHASES[currentPhase] }</div>
            <div>Phase Time: { millisToMinutesAndSeconds(phaseTime) }</div>
            <div>Full Time: {millisToMinutesAndSeconds(timerTime)}</div>
            <button onClick={handleTimer}>
                {props.isRunning ? 'Pause' : 'Start'}
            </button>
            <div>
                Rounds total time:
                { millisToMinutesAndSeconds(getTotalTime()) }
            </div>
            <div>Rounds rest time: { millisToMinutesAndSeconds(props.currTimer.restTime) }</div>
            <div>Rounds prepare time: { millisToMinutesAndSeconds(props.currTimer.prepareTime) }</div>
            <div><button onClick={props.edit}>Edit</button></div>
        </div>
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
        setDefaultValues: () => dispatch(setDefaultValues),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);