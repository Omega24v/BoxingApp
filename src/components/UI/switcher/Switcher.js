import React from 'react';

const Switcher = ({isChecked, toggle, type}) => {

    return (
        <div className={`switch ${type}`}>
            <input
                type="checkbox"
                data-testid={`sd-switch-${type}`}
                id={`sd-switch-${type}`}
                name="switch"
                className="switch__input"
                onChange={() => toggle()}
                checked={isChecked}
            />
            <label htmlFor={`sd-switch-${type}`} className="switch__label" aria-label="switch">
                <span></span>
            </label>
        </div>
    );
};

export default React.memo(Switcher);
