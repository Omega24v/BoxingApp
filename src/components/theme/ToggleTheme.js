import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {toggleTheme} from "../../store/actions/themeActions";
import {Form} from "react-bootstrap";
import {loadData, setData} from "../../utils/localStorage/localStorage";

const ToggleTheme = props => {

    const setThemeToBody = theme => {
        const body = document.querySelector("body");
        body.setAttribute("data-theme", theme);
    }

    const toggleTheme = () => {

        const theme = props.currTheme === 'dark' ? 'light' : 'dark';
        const lsData = loadData('data');

        setThemeToBody(theme);
        setData({
            ...lsData, currTheme: theme
        }, 'data');

        props.toggleTheme(theme);
    }

    useEffect(() => {
        setThemeToBody(props.currTheme);
    }, []);

    return (
        <Form>
            <Form.Check
                onChange={() => toggleTheme()}
                type="switch"
                id="custom-switch"
                label={props.currTheme}
            />
        </Form>
    );
};

function mapStateToProps(state) {
    return {
        currTheme: state.themeReducer.currTheme,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: theme => dispatch(toggleTheme(theme)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleTheme);