import React, {useEffect} from 'react';
import {loadData} from "../../utils/localStorage/localStorage";
import Switcher from "../UI/switcher/Switcher";
import "../UI/switcher/Switcher.sass";
import "./SoundSwitcher.sass";
import {toggleSound} from "../../store/reducers/timer/timerReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/common/redux-hooks";

const SoundSwitcher = () => {

    const dispatch = useAppDispatch();
    const isSound = useAppSelector(state => state.timerReducer.isSound)

    useEffect(() => {
        const isSound = loadData('isSound');
        if (isSound !== undefined && isSound !== isSound) {
            dispatch(toggleSound());
        }
    }, [isSound]);

    return (
        <Switcher
            isChecked={isSound}
            toggle={() => dispatch(toggleSound())}
            type="sound-switcher"
        />
    );
};

export default SoundSwitcher;
