import React, {useState} from 'react';
import {connect} from "react-redux";
import {getRandomId} from "../../utils/getRandomId";
import {addTimer, startTimer, toggleAddTimer} from "../../store/reducers/timer/timerReducer";

const AddTimer = props => {

    const [timer, setTimer] = useState({});

    const setTimerData = e => {

        const target = e.target;
        const value = target.type === 'number' ? +target.value : target.value;
        const name = target.name;

        setTimer({...timer, [name]: value});
    }

    return (
        props.isAdd
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
                        <button type='button' onClick={props.toggleAddTimer}>Cancel</button>
                        <button type='button'
                                onClick={() => props.addTimer({...timer, id: getRandomId()})}>
                            Add new timer
                        </button>
                    </div>
                </form>
            </div>
            : ''
    );
};

function mapStateToProps(state) {
    return {
        isAdd: state.timerReducer.isAdd,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        toggleAddTimer: () => dispatch(toggleAddTimer()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTimer);
