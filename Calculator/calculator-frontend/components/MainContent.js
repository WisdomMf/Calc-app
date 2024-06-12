// components/MainContent.js
import React from 'react';

const MainContent = ({ activeTool }) => {
    return (
        <div className="main-content">
            <h1>{activeTool ? activeTool : 'Dashboard'}</h1>
            <p>{activeTool ? `This is the preview section for ${activeTool}.` : 'Please select a tool from the sidebar.'}</p>
            <style jsx>{`
                .main-content {
                    flex-grow: 1;
                    padding: 20px;
                    background-color: #ecf0f1;
                }
            `}</style>
        </div>
    );
};

export default MainContent;
