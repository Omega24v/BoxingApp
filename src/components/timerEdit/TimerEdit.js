import React, {useState} from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import {connect} from "react-redux";
import {addTimer, toggleEditTimer, startTimer, saveEditData} from "../../store/actions/timerActions";
import {getRandomId} from "../../utils/getRandomId";

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
        <Form className="d-flex flex-column">
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
                {/* <button type='button' onClick={props.toggleEditTimer}>Close</button> */}
                <Button variant="success" className="me-2" onClick={() => {
                                let updatedTimers = props.timers.map(t => {
                                    return t.id !== props.currTimer.id ? t : {...timer, id: props.currTimer.id}
                                });
                                props.saveEditData({timer: {...timer, id: props.currTimer.id}, timers: updatedTimers});
                            }}>
                        Save Settings
                    </Button>
                <Button variant="warning" 
                    onClick={() => props.addTimer({...timer, id: getRandomId()})}>
                    To Favorite
                </Button>
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
        toggleEditTimer: () => dispatch(toggleEditTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        saveEditData: timer => dispatch(saveEditData(timer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerEdit);