import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Calculator.module.css'; // Ensure you have a CSS module for styles

export default function Calculator() {
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push('/login'); // Redirect to the login page
    };

    const navigateToCalculator = (type) => {
        router.push(`/calculator/${type}`);
    };

    return (
        <div className={styles.container}>
            <h1>Welcome to the Calculator Hub</h1>
            <p>Select a calculator to start using:</p>
            <div className={styles.calculatorButtons}>
                <button onClick={() => navigateToCalculator('basic')} className={styles.button}>Basic Calculator</button>
                <button onClick={() => navigateToCalculator('scientific')} className={styles.button}>Scientific Calculator</button>
                <button onClick={() => navigateToCalculator('programmer')} className={styles.button}>Programmer Calculator</button>
            </div>
            <button onClick={handleLoginRedirect} className={styles.loginButton}>Login</button>
        </div>
    );
}
