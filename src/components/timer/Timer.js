import React from 'react';
import {connect} from "react-redux";
import {setDefaultValues, startTimer, stopTimer} from "../../store/actions/timerActions";


const Timer = props => {
    return (
        <div>
            <button>{props.isEnabled ? 'Stop' : 'Start'}</button>
            <div>Rounds: {props.rounds}</div>
            <div>Rounds total time: {props.roundTime}</div>
            <div>Rounds rest time: {props.restTime}</div>
            <div>Rounds prepare time: {props.prepareTime}</div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isEnabled: state.timerReducer.isEnabled,
        rounds: state.timerReducer.rounds,
        roundTime: state.timerReducer.roundTime,
        restTime: state.timerReducer.restTime,
        prepareTime:  state.timerReducer.prepareTime
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer),
        stop: () => dispatch(stopTimer),
        setDefaultValues: () => dispatch(setDefaultValues),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);