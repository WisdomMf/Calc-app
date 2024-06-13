import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Settings = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div>
            <h2>Settings</h2>
            <label>
                Dark Mode
                <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
            </label>
        </div>
    );
};

export default Settings;
