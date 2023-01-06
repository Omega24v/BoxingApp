import React, {useState} from 'react';
import {getRandomId} from "../../utils/getRandomId";
import {addTimer, toggleAddTimer} from "../../store/reducers/timer/timerReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/common/redux-hooks";
import {ITimer} from "../../dataStructure";

const AddTimer = () => {

    const [timer, setTimer] = useState<ITimer>();
    const isAdd = useAppSelector(state => state.timerReducer.isAdd);
    const dispatch = useAppDispatch();

    const setTimerData = (e: React.SyntheticEvent) => {

        const target = e.target as HTMLInputElement;
        const value = target.type === 'number' ? +target.value : target.value;
        const name = target.name;

        if (!timer) return;
        setTimer({...timer, [name]: value});
    }

    const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(toggleAddTimer)
    }

    const handleAddTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!timer) return;
      dispatch(addTimer({...timer, id: getRandomId()}))
    }

    return (
        isAdd
            ?
            <div style={{marginTop: '50px'}}>
                <form>
                    <div>Timer Name: <input name='name' onChange={setTimerData} value={timer?.name} type="text"/></div>
                    <div>Rounds: <input name='rounds' onChange={setTimerData} value={timer?.rounds} type="number"/></div>
                    <div>Round Time: <input name='roundTime' onChange={setTimerData} value={timer?.roundTime?.time} type="number"/></div>
                    <div>Rest Time: <input name='restTime' onChange={setTimerData} value={timer?.restTime?.time} type="number"/></div>
                    <div>Prepare Time: <input name='prepareTime' onChange={setTimerData} value={timer?.prepareTime?.time} type="number"/></div>
                    <div>Warning Time: <input name='warningTime' onChange={setTimerData} value={timer?.warningTime?.time} type="number"/></div>

                    <div>
                        <button type='button' onClick={handleCancelButton}>Cancel</button>
                        <button type='button'
                                onClick={() => handleAddTimer}>
                            Add new timer
                        </button>
                    </div>
                </form>
            </div>
            : ''
    );
};

export default AddTimer;
