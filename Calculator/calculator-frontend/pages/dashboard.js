import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Dashboard = () => {
    const [activeTool, setActiveTool] = useState('');

    return (
        <div className="dashboard-container">
            <Sidebar setActiveTool={setActiveTool} />
            <MainContent activeTool={activeTool} />
            <style jsx>{`
                .dashboard-container {
                    display: flex;
                    height: 100vh;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
