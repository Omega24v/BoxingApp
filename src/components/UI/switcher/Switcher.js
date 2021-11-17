import React from 'react';

const Switcher = ({isChecked, toggle, type}) => {

    return (
        <div className={`switch me-4 ${type}`}>
            <input
                type="checkbox"
                id={`sd-switch-${type}`}
                name="switch"
                className="switch__input"
                onChange={() => toggle()}
                checked={isChecked}
            />
            <label htmlFor={`sd-switch-${type}`} className="switch__label">
                <span></span>
            </label>
        </div>
    );
};

export default Switcher;