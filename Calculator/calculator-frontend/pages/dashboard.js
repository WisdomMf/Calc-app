import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BasicCalculator from '/modules/calculators/BasicCalculator';
import ScientificCalculator from '/modules/calculators/ScientificCalculator';
import ProgrammerCalculator from '/modules/calculators/ProgrammerCalculator';
import Profile from '../modules/Profile';
import Settings from '../modules/Settings';
import { ThemeProvider } from '../context/ThemeContext';

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('profile');
    const [components, setComponents] = useState({});

    React.useEffect(() => {
        setComponents({
            profile: <Profile />,
            settings: <Settings />,
            basicCalculator: <BasicCalculator />,
            scientificCalculator: <ScientificCalculator />,
            programmerCalculator: <ProgrammerCalculator />
        });
    }, []);

    const renderContent = () => {
        const ActiveComponent = components[activeItem];
        return ActiveComponent || <p>Component not found.</p>;
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        // Redirect to login or home page
    };

    return (
        <ThemeProvider>
            <div style={{ display: 'flex' }}>
                <Sidebar setActiveItem={setActiveItem} handleLogout={handleLogout} />
                <div style={{ flex: 1, padding: '20px' }}>
                    {renderContent()}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
