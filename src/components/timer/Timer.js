import React from 'react';
import {connect} from "react-redux";
import {setDefaultValues, startTimer, stopTimer} from "../../store/actions/timerActions";
import { Col, Button } from 'react-bootstrap';
import cl from './Timer.module.sass';

const Timer = props => {
    return (
        <>
            <Col lg={6} className={[cl.rounds, cl.dflex].join( )}>
                <h2 className={cl.rounds__text}>
                    Rounds
                </h2> 
                <span className={cl.rounds__count}>
                    {props.rounds}
                </span>
            </Col>
            
            <Col lg={6} className={cl.total}>
                <h2 className={cl.total__text}>
                    Rounds total time:
                </h2>
                <span className={cl.total__count}>
                    {props.roundTime}
                </span>
            </Col>
            
            <Col lg={12}>
                <div className={cl.rest}>
                    Rounds rest time: {props.restTime}
                </div>
                <div className={cl.prepare}>
                    Rounds prepare time: {props.prepareTime}
                </div>
            </Col>
            <Button variant="success">{props.isEnabled ? 'Stop' : 'Start'}</Button>
        </>
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