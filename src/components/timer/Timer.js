import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {pauseTimer, setDefaultValues, startTimer, stopTimer} from "../../store/actions/timerActions";
import millisToMinutesAndSeconds from "../../utils/timeConverter";
import {PHASES} from "../../constatns/timerDefaultValues";


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
        <div>
            <div>Current Round: { currentRound } / { props.rounds }</div>
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
            <div>Rounds rest time: { millisToMinutesAndSeconds(props.restTime) }</div>
            <div>Rounds prepare time: { millisToMinutesAndSeconds(props.prepareTime) }</div>
        </div>
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