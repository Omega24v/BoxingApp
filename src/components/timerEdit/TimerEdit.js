import React from 'react';
import {ButtonGroup, Button, Form, InputGroup} from 'react-bootstrap';
import {connect} from "react-redux";
import {addTimer, startTimer, saveEditData, onChangeEditData, toggleEditTimer} from "../../store/actions/timerActions";
import {getRandomId} from "../../utils/getRandomId";
import {getMinAndSecFromMs, getMsFromMinAndSec} from "../../utils/timeConverter";

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
            <InputGroup className="mb-3">
                <InputGroup.Text>Round Time</InputGroup.Text>
                <InputGroup.Text>Min:</InputGroup.Text>
                <Form.Control name='roundTimeMin'
                              onChange={setTimerData}
                              value={getMinAndSecFromMs(props.editTimerData.roundTime).min}
                              type="number"/>
                <InputGroup.Text>Sec:</InputGroup.Text>
                <Form.Control name='roundTimeSec'
                              onChange={setTimerData}
                              value={getMinAndSecFromMs(props.editTimerData.roundTime).sec}
                              type="number"/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Rest Time</InputGroup.Text>
                <InputGroup.Text>Min:</InputGroup.Text>
                <Form.Control name='restTimeMin'
                              onChange={setTimerData}
                              value={getMinAndSecFromMs(props.editTimerData.restTime).min}
                              type="number"/>
                <InputGroup.Text>Sec:</InputGroup.Text>
                <Form.Control name='restTimeSec'
                              onChange={setTimerData}
                              value={getMinAndSecFromMs(props.editTimerData.restTime).sec}
                              type="number"/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Prepare Time</InputGroup.Text>
                <InputGroup.Text>Min:</InputGroup.Text>
                <Form.Control name='prepareTimeMin'
                              onChange={setTimerData}
                              value={getMinAndSecFromMs(props.editTimerData.prepareTime).min}
                              type="number"/>
                <InputGroup.Text>Sec:</InputGroup.Text>
                <Form.Control name='prepareTimeSec'
                              onChange={setTimerData}
                              value={getMinAndSecFromMs(props.editTimerData.prepareTime).sec}
                              type="number"/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Warning Time</InputGroup.Text>
                <InputGroup.Text>Min:</InputGroup.Text>
                <Form.Control name='warningTimeMin'
                              onChange={setTimerData}
                              value={getMinAndSecFromMs(props.editTimerData.warningTime).min}
                              type="number"/>
                <InputGroup.Text>Sec:</InputGroup.Text>
                <Form.Control name='warningTimeSec'
                              onChange={setTimerData}
                              value={getMinAndSecFromMs(props.editTimerData.warningTime).sec}
                              type="number"/>
            </InputGroup>

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