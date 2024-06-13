// /components/MainContent.js
import React from 'react';

const MainContent = ({ activeItem }) => {
    const renderContent = () => {
        switch (activeItem) {
            case 'basic':
                return <div>Basic Calculator</div>;
            case 'scientific':
                return <div>Scientific Calculator</div>;
            case 'programmer':
                return <div>Programmer Calculator</div>;
            case 'settings':
                return <div>Settings</div>;
            case 'profile':
                return <div>Profile</div>;
            default:
                return <div>Select an option from the sidebar</div>;
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default MainContent;
