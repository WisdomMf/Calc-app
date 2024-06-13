import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import BasicCalculator from '../modules/calculators/BasicCalculator';
import ScientificCalculator from '../modules/calculators/ScientificCalculator';
import ProgrammerCalculator from '../modules/calculators/ProgrammerCalculator';
import Profile from '../modules/Profile';
import Settings from '../modules/Settings';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import '../styles/global.css'; // Ensure you have this style file to handle the dark mode styles

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('profile');
    const [components, setComponents] = useState({});

    useEffect(() => {
        setComponents({
            profile: <Profile />,
            settings: <Settings />,
            basic: <BasicCalculator />,
            scientific: <ScientificCalculator />,
            programmer: <ProgrammerCalculator />
        });
    }, []);

    const renderContent = () => {
        const ActiveComponent = components[activeItem];
        return ActiveComponent || <p>Component not found.</p>;
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to sign out?');
        if (confirmLogout) {
            const settings = {
                theme: localStorage.getItem('theme')
            };
            localStorage.setItem('user-settings', JSON.stringify(settings));
            localStorage.removeItem('auth-token');
            window.location.href = '/'; // Redirect to home or login page
        }
    };

    return (
        <ThemeProvider>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar setActiveItem={setActiveItem} handleLogout={handleLogout} />
                <div style={{ flex: 1, padding: '20px' }}>
                    {renderContent()}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
