import React, {useState} from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import {connect} from "react-redux";
import {addTimer, startTimer, saveEditData, onChangeEditData} from "../../store/actions/timerActions";
import {getRandomId} from "../../utils/getRandomId";

const TimerEdit = props => {

    const setTimerData = e => {

        let editableTimer = {...props.currTimer}
        const target = e.target;
        const value = target.type === 'number' ? +target.value : target.value;
        const name = target.name;
        editableTimer = {...props.editTimerData, [name]: value};

        props.onChangeEditData(editableTimer);
    }

    return (
        <Form className="d-flex flex-column">
            <Form.Label>
                Timer Name:
                <Form.Control name='name' onChange={setTimerData} value={props.editTimerData.name} type="text"/>
            </Form.Label>
            <Form.Label>
                Rounds:
                <Form.Control name='rounds' onChange={setTimerData} value={props.editTimerData.rounds} type="number"/>
            </Form.Label>
            <Form.Label>
                Round Time:
                <Form.Control name='roundTime' onChange={setTimerData} value={props.editTimerData.roundTime} type="number"/>
            </Form.Label>
            <Form.Label>
                Rest Time:
                <Form.Control name='restTime' onChange={setTimerData} value={props.editTimerData.restTime} type="number"/>
            </Form.Label>
            <Form.Label>
                Prepare Time:
                <Form.Control name='prepareTime' onChange={setTimerData} value={props.editTimerData.prepareTime} type="number"/>
            </Form.Label>
            <Form.Label>
                Warning Time:
                <Form.Control name='warningTime' onChange={setTimerData} value={props.editTimerData.warningTime} type="number"/>
            </Form.Label>
            <ButtonGroup className="d-flex mt-2">
                <Button variant="success" className="me-2" onClick={() => {
                                let updatedTimers = props.timers.map(t => {
                                    return t.id !== props.currTimer.id ? t : {...props.editTimerData, id: props.currTimer.id}
                                });
                                props.saveEditData({timer: {...props.editTimerData, id: props.currTimer.id}, timers: updatedTimers});
                            }}>
                        Save Settings
                    </Button>
                <Button variant="warning"
                    onClick={() => props.addTimer({...props.editTimerData, id: getRandomId()})}>
                    To Favorite
                </Button>
            </ButtonGroup>
        </Form>
    );
};

function mapStateToProps(state) {
    return {
        currTimer: state.timerReducer.currTimer,
        timers: state.timerReducer.timers,
        isEdit: state.timerReducer.isEdit,
        editTimerData: state.timerReducer.editTimerData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        saveEditData: timer => dispatch(saveEditData(timer)),
        onChangeEditData: data => dispatch(onChangeEditData(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerEdit);