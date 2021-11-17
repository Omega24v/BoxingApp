import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {toggleSound} from "../../store/actions/timerActions";
import {loadData} from "../../utils/localStorage/localStorage";
import './SoundSwitcher.sass';

const SoundSwitcher = props => {

    useEffect(() => {
        const isSound = loadData('isSound');
        if (isSound !== undefined && isSound !== props.isSound) {
            props.toggleSound();
        }
    }, []);

    return (
        <>
            <div className="sound-switch me-5">
                <input 
                type="checkbox" 
                id="sd-switch" 
                name="sound-switch" 
                className="sound-switch__input" 
                onChange={() => props.toggleSound()}
                checked={props.isSound}
                />
                <label htmlFor="sd-switch" className="sound-switch__label">
                    <span></span>
                </label>
            </div>
        </>
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