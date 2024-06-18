import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faCogs, faUser, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ setActiveItem, handleLogout }) => {
    const { theme } = useTheme();
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

    const toggleCalculatorSubmenu = () => {
        setIsCalculatorOpen(!isCalculatorOpen);
    };

    return (
        <div className={`${styles.sidebar} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <ul>
                <li onClick={toggleCalculatorSubmenu}>
                    <FontAwesomeIcon icon={faCalculator} /> Calculators
                    <ul className={`${styles.submenu} ${isCalculatorOpen ? styles.open : ''}`}>
                        <li onClick={() => setActiveItem('AdminDashboard')}>Manage Calculators</li>
                        <li onClick={() => setActiveItem('CreateCalculator')}>CreateCalculator
                        </li>
                    </ul>
                </li>
                <li onClick={() => setActiveItem('settings')}>
                    <FontAwesomeIcon icon={faCogs} /> Settings
                </li>
                <li onClick={() => setActiveItem('profile')}>
                    <FontAwesomeIcon icon={faUser} /> Profile
                </li>
                <li onClick={() => setActiveItem('users')}>
                    <FontAwesomeIcon icon={faUsers} /> Users
                </li>
            </ul>
            <button className={styles.logoutButton} onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
        </div>
    );
};

export default Sidebar;