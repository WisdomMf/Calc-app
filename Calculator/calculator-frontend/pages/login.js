import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            localStorage.setItem('auth-token', response.data);
            router.push('/dashboard');
        } catch (err) {
            setError('Login failed: ' + (err.response ? err.response.data : err.message));
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                />
                <button onClick={handleLogin} className={styles.button}>Login</button>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
