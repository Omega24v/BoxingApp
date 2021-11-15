import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {loadData, setData} from "../../utils/localStorage/localStorage";
import {THEME_DARK, THEME_LIGHT} from "../../constatns/theme";

const ToggleTheme = () => {

    const [currTheme, setCurrTheme] = useState(THEME_DARK);

    const setThemeToBody = theme => {
        const body = document.querySelector("body");
        body.setAttribute("data-theme", theme);
    }

    const toggleTheme = () => {
        const theme = currTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        setCurrTheme(theme);
        setThemeToBody(theme);
        setData(theme, 'theme');
    }

    useEffect(() => {
        const currTheme = loadData('theme');
        setCurrTheme(currTheme || THEME_DARK);
        setThemeToBody(currTheme|| THEME_DARK);
    }, []);

    return (
        <Form>
            <Form.Check
                onChange={() => toggleTheme()}
                type="switch"
                id="custom-switch"
                label={currTheme}
            />
        </Form>
    );
};

export default ToggleTheme;