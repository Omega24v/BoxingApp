import React, {useState} from 'react';
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
        <div style={{marginTop: '50px'}}>
            <form>
                <div>Timer Name: <input name='name' onChange={setTimerData} value={timer.name} type="text"/></div>
                <div>Rounds: <input name='rounds' onChange={setTimerData} value={timer.rounds} type="number"/></div>
                <div>Round Time: <input name='roundTime' onChange={setTimerData} value={timer.roundTime} type="number"/></div>
                <div>Rest Time: <input name='restTime' onChange={setTimerData} value={timer.restTime} type="number"/></div>
                <div>Prepare Time: <input name='prepareTime' onChange={setTimerData} value={timer.prepareTime} type="number"/></div>
                <div>Warning Time: <input name='warningTime' onChange={setTimerData} value={timer.warningTime} type="number"/></div>

                <div>
                    <button type='button' onClick={props.edit}>Close</button>
                    <button type='button'
                            onClick={() => {
                                let updatedTimers = props.timers.map(t => {
                                    return t.id !== props.currTimer.id ? t : {...timer, id: props.currTimer.id}
                                });
                                props.saveEditData({timer: {...timer, id: props.currTimer.id}, timers: updatedTimers});
                            }}>
                        Save
                    </button>
                    <button type='button'
                            onClick={() => props.addTimer({...timer, id: getRandomId()})}>
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