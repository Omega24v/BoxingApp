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

    const switchChecked = (currTheme) => {
        const switchBtn = document.querySelector("#custom-switch");
        currTheme === "dark" ? switchBtn.checked = true : switchBtn.checked = false
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
        setThemeToBody(currTheme || THEME_DARK);
        switchChecked(currTheme)
    }, []);

    return (
        <div className="theme-switch">
            <input type="checkbox" id="custom-switch" name="theme-switch" className="theme-switch__input" onChange={() => toggleTheme()}/>
            <label htmlFor="custom-switch" className="theme-switch__label" label={currTheme}>
                <span></span>
            </label>
        </div>
    );
};

export default ToggleTheme;