import React from 'react';
import { Form } from 'react-bootstrap';
import {connect} from "react-redux";
import {toggleSound} from "../../store/actions/timerActions";

const SoundSwitcher = props => {
    return (
        <div>
            <Form>
                <Form.Check
                    type="switch"
                    checked={props.isSound}
                    onChange={() => props.toggleSound()}
                    label={props.isSound ? 'Sound on' : 'Sound off' }
                />
            </Form>
        </div>
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