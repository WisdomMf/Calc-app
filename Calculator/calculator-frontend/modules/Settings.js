import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <h1>Settings</h1>
            <label>
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
                Dark Mode
            </label>
        </div>
    );
};

export default Settings;
