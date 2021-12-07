import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {toggleSound} from "../../store/actions/timerActions";
import {loadData} from "../../utils/localStorage/localStorage";
import Switcher from "../UI/switcher/Switcher";
import "../UI/switcher/Switcher.sass";
import "./SoundSwitcher.sass";

const SoundSwitcher = props => {
    useEffect(() => {
        const isSound = loadData('isSound');
        if (isSound !== undefined && isSound !== props.isSound) {
            props.toggleSound();
        }
    }, [props]);

    return (
        <Switcher 
            isChecked={props.isSound}
            toggle={props.toggleSound}
            type="sound-switcher"
        />
    );
};

function mapStateToProps(state) {
    return {
        isSound: state.timerReducer.isSound,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSound: () => dispatch(toggleSound()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundSwitcher);