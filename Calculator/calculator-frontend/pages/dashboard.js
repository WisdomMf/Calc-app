import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import BasicCalculator from '../modules/Calculators/BasicCalculator';
import ScientificCalculator from '../modules/calculators/ScientificCalculator';
import ProgrammerCalculator from '../modules/calculators/ProgrammerCalculator';
import AdminDashboard from '../pages/AdminDashboard';
import Profile from '../modules/Profile';
import Settings from '../modules/Settings';
import Users from '../modules/Users';
import CalculatorAdminView from '../modules/Calculators/BasicCalculator'; // Import admin view component
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import '../styles/global.css';

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('profile');
    const [components, setComponents] = useState({});
    const [selectedCalculator, setSelectedCalculator] = useState(null); // State for selected calculator
    const [showAdminView, setShowAdminView] = useState(false); // State to toggle admin view

    useEffect(() => {
        setComponents({
            profile: <Profile />,
            settings: <Settings />,
            basic: <BasicCalculator />,
            scientific: <ScientificCalculator />,
            programmer: <ProgrammerCalculator />,
            AdminDashboard: <AdminDashboard />,
            users: <Users />
        });
    }, []);

    const renderContent = () => {
        if (selectedCalculator && showAdminView) {
            return <CalculatorAdminView calculator={selectedCalculator} />;
        }
        const ActiveComponent = components[activeItem];
        return ActiveComponent || <p>Component not found.</p>;
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to sign out?');
        if (confirmLogout) {
            localStorage.removeItem('auth-token');
            window.location.href = '/'; // Redirect to home or login page
        }
    };

    return (
        <ThemeProvider>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar setActiveItem={setActiveItem} handleLogout={handleLogout} setSelectedCalculator={setSelectedCalculator} setShowAdminView={setShowAdminView} />
                <div style={{ flex: 1, padding: '20px' }}>
                    {renderContent()}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
