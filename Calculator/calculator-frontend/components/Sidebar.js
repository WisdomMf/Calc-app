// components/Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faUser, faSignOutAlt, faCalculator, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ setActiveItem, handleLogout }) => {
    const { theme } = useTheme();

    return (
        <div className={`${styles.sidebar} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <ul>
                <li onClick={() => setActiveItem('AdminDashboard')} className={styles.sidebarItem}>
                    <FontAwesomeIcon icon={faCalculator} className={styles.icon} /> Calculator
                </li>
                <li onClick={() => setActiveItem('settings')} className={styles.sidebarItem}>
                    <FontAwesomeIcon icon={faCogs} className={styles.icon} /> Settings
                </li>
                <li onClick={() => setActiveItem('profile')} className={styles.sidebarItem}>
                    <FontAwesomeIcon icon={faUser} className={styles.icon} /> Profile
                </li>
                <li onClick={() => setActiveItem('users')} className={styles.sidebarItem}>
                    <FontAwesomeIcon icon={faUsers} className={styles.icon} /> Users
                </li>
            </ul>
            <button className={styles.logoutButton} onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
        </div>
    );
};

export default Sidebar;
