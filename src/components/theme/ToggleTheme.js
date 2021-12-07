import React, {useEffect, useState} from 'react';
import {loadData, setData} from "../../utils/localStorage/localStorage";
import {THEME_DARK, THEME_LIGHT} from "../../constatns/theme";
import Switcher from "../UI/switcher/Switcher";
import "../UI/switcher/Switcher.sass";
import "./ToggleTheme.sass";

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
        <Switcher isChecked={currTheme === THEME_DARK}
            toggle={toggleTheme}
            type="theme-switcher"
        />
    );
};

export default ToggleTheme;