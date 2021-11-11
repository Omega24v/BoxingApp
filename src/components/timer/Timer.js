import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
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
import millisToMinutesAndSeconds from "../../utils/timeConverter";
import {PHASES} from "../../constatns/timerDefaultValues";
import {getTotalTime} from "../../utils/common";


const Timer = props => {

    useEffect(() => {

        if (props.currentPhase === 1 && props.intervalCount === props.currTimer.prepareTime) {
            props.setIntervalCount(0);
            props.setPhaseTime(props.currTimer.roundTime);
            props.setCurrentPhase(2);
        } else if (props.currentPhase === 2 && props.intervalCount === props.currTimer.roundTime - props.currTimer.warningTime) {
            props.setCurrentPhase(3);
        } else if (props.currentPhase === 3 && props.intervalCount === props.currTimer.roundTime) {

            if (props.currentRound === props.currTimer.rounds) {
                props.stop();
                clearInterval(props.intervalId);
                props.resetTimer();
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

        const newIntervalId = setInterval(() => {
            props.setIntervalCount(1000);
            props.countPhaseTime(1000);
            props.setFullTime(1000);
        }, 1000);

        props.setIntervalId(newIntervalId);
    }

    return (
        <div>
            <div>Current Round: { props.currentRound } / { props.currTimer.rounds }</div>
            <div>Phase: { PHASES[props.currentPhase] }</div>
            <div>Phase Time: { props.phaseTime }</div>
            <div>Full Time: {props.fullTime}</div>
            <div>
                {props.isRunning
                ?
                    <button>
                        Stop
                    </button>
                :
                    ''
                }
                <button onClick={handleTimer}>
                    {props.isRunning ? 'Pause' : 'Start'}
                </button>

            </div>
            <div>
                Rounds total time:
                { millisToMinutesAndSeconds(getTotalTime(props.currTimer)) }
            </div>
            <div>Rounds rest time: { millisToMinutesAndSeconds(props.currTimer.restTime) }</div>
            <div>Rounds prepare time: { millisToMinutesAndSeconds(props.currTimer.prepareTime) }</div>
            <div><button onClick={props.edit}>Edit</button></div>
            <div><button onClick={props.toggleAddTimer}>Add</button></div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
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
        edit: () => dispatch(toggleEditTimer()),
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