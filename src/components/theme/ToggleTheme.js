import React, {useEffect, useState} from 'react';
import {loadData, setData} from "../../utils/localStorage/localStorage";
import {THEME_DARK, THEME_LIGHT} from "../../constatns/theme";
import './ToggleTheme.sass';

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
        const theme = loadData('theme');
        setCurrTheme(theme || THEME_DARK);
        setThemeToBody(theme || THEME_DARK);
    }, []);

    return (
        <div className="theme-switch ms-4">
            <input type="checkbox"
                   id="custom-switch"
                   name="theme-switch"
                   checked={currTheme === THEME_DARK}
                   className="theme-switch__input"
                   onChange={() => toggleTheme()}/>
            <label htmlFor="custom-switch"
                   className="theme-switch__label"
                   label={currTheme}>
                <span></span>
            </label>
        </div>
    );
};

export default ToggleTheme;