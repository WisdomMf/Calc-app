import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faCogs, faUser, faSignOutAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ setActiveItem }) => {
    const router = useRouter();

    const handleLogout = () => {
        try {
            localStorage.removeItem('auth-token');
            router.push('/login'); // Redirect to login page
        } catch (err) {
            console.error('Failed to logout:', err);
        }
    };

    const [isCalculatorDropdownOpen, setIsCalculatorDropdownOpen] = useState(false);

    const toggleCalculatorDropdown = () => {
        setIsCalculatorDropdownOpen(!isCalculatorDropdownOpen);
    };

    return (
        <div className={styles.sidebar}>
            <ul>
                <li onClick={() => setActiveItem('basicCalculator')}>
                    <FontAwesomeIcon icon={faCalculator} /> Basic Calculator
                </li>
                <li onClick={() => setActiveItem('scientificCalculator')}>
                    <FontAwesomeIcon icon={faCalculator} /> Scientific Calculator
                </li>
                <li onClick={() => setActiveItem('programmerCalculator')}>
                    <FontAwesomeIcon icon={faCalculator} /> Programmer Calculator
                </li>
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
