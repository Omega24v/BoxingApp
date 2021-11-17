import React from 'react';
import {ButtonGroup, Button, Form, InputGroup} from 'react-bootstrap';
import {connect} from "react-redux";
import {addTimer, startTimer, saveEditData, onChangeEditData, toggleEditTimer} from "../../store/actions/timerActions";
import {getRandomId} from "../../utils/getRandomId";
import {getMinAndSecFromMs, getMsFromMinAndSec, msToMAS} from "../../utils/timeConverter";
import './TimerEdit.sass'
import {getTotalTime} from "../../utils/common";

const TimerEdit = props => {

    const saveFormData = () => {
        let updatedTimers = props.timers.map(t => {
            return t.id !== props.currTimer.id ? t : {...props.editTimerData, id: props.currTimer.id}
        });
        props.toggleEditTimer();
        props.saveEditData({timer: {...props.editTimerData, id: props.currTimer.id}, timers: updatedTimers});
    }

    const setTimerData = e => {

        let editableTimer = {...props.currTimer}
        const target = e.target;
        const value = target.type === 'number' ? +target.value : target.value;
        const name = target.name;
        editableTimer = {...props.editTimerData, [name]: value};
        editableTimer.roundTime = getMsFromMinAndSec(editableTimer.roundTimeMin, editableTimer.roundTimeSec);
        editableTimer.restTime = getMsFromMinAndSec(editableTimer.restTimeMin, editableTimer.restTimeSec);
        editableTimer.prepareTime = getMsFromMinAndSec(editableTimer.prepareTimeMin, editableTimer.prepareTimeSec);
        editableTimer.warningTime = getMsFromMinAndSec(editableTimer.warningTimeMin, editableTimer.warningTimeSec);
        editableTimer.fullTime = getTotalTime(editableTimer);

        props.onChangeEditData(editableTimer);
    }

    return (
        <Form className="edit-form d-flex flex-column">
            <Form.Label>
                <div className="mb-2">Timer Name:</div>
                <Form.Control name='name' onChange={setTimerData} value={props.editTimerData.name} type="text"/>
            </Form.Label>

            <InputGroup className="edit-form__group my-3">
                <InputGroup.Text className="rounds">Rounds:</InputGroup.Text>
                <Form.Control name='rounds'
                    onChange={setTimerData}
                    value={props.editTimerData.rounds}
                    type="number"
                    min="0"/>
            </InputGroup>
            <InputGroup className="edit-form__group mb-3">
                <InputGroup.Text>Round Time</InputGroup.Text>
                <Form.Control name='roundTimeMin'
                    onChange={setTimerData}
                    value={getMinAndSecFromMs(props.editTimerData.roundTime).min}
                    type="number" min="0"/><span className="mx-1">:</span>
                <Form.Control name='roundTimeSec'
                    onChange={setTimerData}
                    value={getMinAndSecFromMs(props.editTimerData.roundTime).sec}
                    type="number" min="0"/>
            </InputGroup>
            <InputGroup className="edit-form__group mb-3">
                <InputGroup.Text className="group-item">Rest Time</InputGroup.Text>
                <Form.Control name='restTimeMin'
                    onChange={setTimerData}
                    value={getMinAndSecFromMs(props.editTimerData.restTime).min}
                    type="number" min="0"/><span className="mx-1">:</span>
                <Form.Control name='restTimeSec'
                    onChange={setTimerData}
                    value={getMinAndSecFromMs(props.editTimerData.restTime).sec}
                    type="number" min="0"/>
            </InputGroup>
            <InputGroup className="edit-form__group mb-3">
                <InputGroup.Text className="group-item">Prepare Time</InputGroup.Text>
                <Form.Control 
                    name='prepareTimeMin'
                    onChange={setTimerData}
                    value={getMinAndSecFromMs(props.editTimerData.prepareTime).min}
                    type="number" min="0"/><span className="mx-1">:</span>
                <Form.Control 
                    name='prepareTimeSec'
                    onChange={setTimerData}
                    value={getMinAndSecFromMs(props.editTimerData.prepareTime).sec}
                    type="number" min="0"/>
            </InputGroup>
            <InputGroup className="edit-form__group mb-3">
                <InputGroup.Text>Warning Time</InputGroup.Text>
                <Form.Control name='warningTimeMin'
                    onChange={setTimerData}
                    value={getMinAndSecFromMs(props.editTimerData.warningTime).min}
                    type="number" min="0"/><span className="mx-1">:</span>
                <Form.Control name='warningTimeSec'
                    onChange={setTimerData}
                    value={getMinAndSecFromMs(props.editTimerData.warningTime).sec}
                    type="number" min="0"/>
            </InputGroup>

            <div className="edit-form__total text-center my-2">Total time: {msToMAS(props.editTimerData.fullTime)}</div>

            <ButtonGroup className="d-flex mt-2">
                <Button variant="success" className="me-2" onClick={saveFormData}>
                        Save Settings
                    </Button>
                <Button variant="warning"
                    onClick={() => {
                        props.toggleEditTimer();
                        props.addTimer({...props.editTimerData, id: getRandomId()});
                    }}>
                    Save as new timer
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
        fullTime: state.timerReducer.fullTime,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        saveEditData: timer => dispatch(saveEditData(timer)),
        onChangeEditData: data => dispatch(onChangeEditData(data)),
        toggleEditTimer: () => dispatch(toggleEditTimer()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerEdit);