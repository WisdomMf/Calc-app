import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/SignIn.module.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });

            // Assuming the server sends back a token
            localStorage.setItem('auth-token', response.data);
            console.log('Login successful, token:', response.data);

            // Redirect or update application state to reflect the login
            window.location.href = '/dashboard'; // or use a routing library like react-router

        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={styles.signInContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Login</h2>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
        </div>
    );
};

export default SignIn;
