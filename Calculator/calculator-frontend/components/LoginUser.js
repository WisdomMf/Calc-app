import React, { useState } from 'react';
import axios from 'axios';

const LoginUser = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', credentials);
            localStorage.setItem('auth-token', response.data);
            alert('Logged in successfully');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Failed to login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginUser;
