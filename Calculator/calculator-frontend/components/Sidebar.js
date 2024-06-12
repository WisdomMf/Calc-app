// components/Sidebar.js
import React from 'react';

const Sidebar = ({ setActiveTool }) => {
    return (
        <div className="sidebar">
            <h2>Admin Tools</h2>
            <ul>
                <li onClick={() => setActiveTool('Tool 1')}>Tool 1</li>
                <li onClick={() => setActiveTool('Tool 2')}>Tool 2</li>
                <li onClick={() => setActiveTool('Tool 3')}>Tool 3</li>
                <li onClick={() => setActiveTool('Tool 4')}>Tool 4</li>
            </ul>
            <style jsx>{`
                .sidebar {
                    width: 250px;
                    background-color: #2c3e50;
                    color: white;
                    padding: 20px;
                    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
                }
                .sidebar h2 {
                    margin-top: 0;
                }
                .sidebar ul {
                    list-style-type: none;
                    padding: 0;
                }
                .sidebar ul li {
                    margin: 10px 0;
                    cursor: pointer;
                }
                .sidebar ul li:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default Sidebar;
