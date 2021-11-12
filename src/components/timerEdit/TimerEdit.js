import React, {useState} from 'react';
import {connect} from "react-redux";
import {addTimer, toggleEditTimer, startTimer, saveEditData, onChangeEditData} from "../../store/actions/timerActions";
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
        props.isEdit
        ?
        <div style={{marginTop: '50px'}}>
            <form>
                <div>Timer Name:
                    <input name='name' onChange={setTimerData}
                           value={props.editTimerData.name}
                           type="text"/>
                </div>
                <div>Rounds:
                    <input name='rounds'
                           onChange={setTimerData}
                           value={props.editTimerData.rounds}
                           type="number"/>
                </div>
                <div>Round Time:
                    <input name='roundTime'
                           onChange={setTimerData}
                           value={props.editTimerData.roundTime}
                           type="number"/>
                </div>
                <div>Rest Time:
                    <input name='restTime' onChange={setTimerData}
                           value={props.editTimerData.restTime}
                           type="number"/>
                </div>
                <div>Prepare Time:
                    <input name='prepareTime' onChange={setTimerData}
                           value={props.editTimerData.prepareTime}
                           type="number"/>
                </div>
                <div>Warning Time:
                    <input name='warningTime' onChange={setTimerData}
                           value={props.editTimerData.warningTime}
                           type="number"/>
                </div>

                <div>
                    <button type='button' onClick={props.toggleEditTimer}>Close</button>
                    <button type='button'
                            onClick={() => {
                                let updatedTimers = props.timers.map(t => {
                                    return t.id !== props.currTimer.id ? t : {...props.editTimerData, id: props.currTimer.id}
                                });
                                props.saveEditData({timer: {...props.editTimerData, id: props.currTimer.id}, timers: updatedTimers});
                            }}>
                        Save
                    </button>
                    <button type='button'
                            onClick={() => props.addTimer({...props.editTimerData, id: getRandomId()})}>
                        Save As New
                    </button>
                </div>
            </form>
        </div>
        : ''
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
        toggleEditTimer: () => dispatch(toggleEditTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        saveEditData: timer => dispatch(saveEditData(timer)),
        onChangeEditData: data => dispatch(onChangeEditData(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerEdit);