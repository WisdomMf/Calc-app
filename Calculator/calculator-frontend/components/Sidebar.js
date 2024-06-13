// /components/Sidebar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faCogs, faUser, faSignOutAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ setActiveItem, handleLogout }) => {
    const [isCalculatorDropdownOpen, setIsCalculatorDropdownOpen] = useState(false);

    const toggleCalculatorDropdown = () => {
        setIsCalculatorDropdownOpen(!isCalculatorDropdownOpen);
    };

    return (
        <div className={styles.sidebar}>
            <ul>
                <li onClick={toggleCalculatorDropdown}>
                    <FontAwesomeIcon icon={faCalculator} /> Calculator {isCalculatorDropdownOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                </li>
                {isCalculatorDropdownOpen && (
                    <ul className={styles.dropdown}>
                        <li onClick={() => setActiveItem('basic')}><FontAwesomeIcon icon={faCalculator} /> Basic Calculator</li>
                        <li onClick={() => setActiveItem('scientific')}><FontAwesomeIcon icon={faCalculator} /> Scientific Calculator</li>
                        <li onClick={() => setActiveItem('programmer')}><FontAwesomeIcon icon={faCalculator} /> Programmer Calculator</li>
                    </ul>
                )}
                <li onClick={() => setActiveItem('settings')}>
                    <FontAwesomeIcon icon={faCogs} /> Settings
                </li>
                <li onClick={() => setActiveItem('profile')}>
                    <FontAwesomeIcon icon={faUser} /> Profile
                </li>
            </ul>
            <button className={styles.logoutButton} onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
        </div>
    );
};

export default Sidebar;
