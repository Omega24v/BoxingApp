import Button from '@restart/ui/esm/Button';
import React, {useState} from 'react';
import { ButtonGroup, Form } from 'react-bootstrap';
import {connect} from "react-redux";
import {addTimer, toggleEditTimer, startTimer, saveEditData} from "../../store/actions/timerActions";
import {getRandomId} from "../../utils/getRandomId";
import './TimerEdit.sass';

const TimerEdit = props => {

    const [timer, setTimer] = useState(props.currTimer);

    const setTimerData = e => {
        const target = e.target;
        const value = target.type === 'number' ? +target.value : target.value;
        const name = target.name;

        setTimer({...timer, [name]: value});
    }

    return (
        props.isEdit
        ?
        <Form>
            <Form.Label>
                Timer Name: 
                <Form.Control name='name' onChange={setTimerData} value={timer.name} type="text"/>
            </Form.Label>
            <Form.Label>
                Rounds: 
                <Form.Control name='rounds' onChange={setTimerData} value={timer.rounds} type="number"/
            ></Form.Label>
            <Form.Label>
                Round Time: 
                <Form.Control name='roundTime' onChange={setTimerData} value={timer.roundTime} type="number"/>
            </Form.Label>
            <Form.Label>
                Rest Time: 
                <Form.Control name='restTime' onChange={setTimerData} value={timer.restTime} type="number"/>
            </Form.Label>
            <Form.Label>
                Prepare Time: 
                <Form.Control name='prepareTime' onChange={setTimerData} value={timer.prepareTime} type="number"/>
            </Form.Label>
            <Form.Label>
                Warning Time: 
                <Form.Control name='warningTime' onChange={setTimerData} value={timer.warningTime} type="number"/>
            </Form.Label>

            <ButtonGroup className="d-flex mt-2">
                <Button variant="warning" className="me-2" onClick={props.edit}>Close</Button>
                <Button variant="light" className="me-2" onClick={() => {
                    let updatedTimers = props.timers.map(t => {
                            return t.id !== props.currTimer.id ? t : {...timer, id: props.currTimer.id}
                        });
                        props.saveEditData({timer: {...timer, id: props.currTimer.id}, timers: updatedTimers});
                    }}>Save</Button>
                <Button variant="light" onClick={() => props.addTimer({...timer, id: getRandomId()})}>Save New</Button>
            </ButtonGroup>
        </Form>
        : ''
    );
};

function mapStateToProps(state) {
    return {
        currTimer: state.timerReducer.currTimer,
        timers: state.timerReducer.timers,
        isEdit: state.timerReducer.isEdit,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        toggleEditTimer: timer => dispatch(toggleEditTimer(timer)),
        saveEditData: timer => dispatch(saveEditData(timer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerEdit);