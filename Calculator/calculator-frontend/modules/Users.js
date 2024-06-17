import React, { useState } from 'react';
import '../styles/global.css'; // Adjust the path as necessary

const Users = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        description: ''
    });

    const { fullName, email, username, password, description } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth-token');

            const response = await fetch('http://localhost:5000/api/admin/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add user');
            }

            console.log('User added successfully:', data);
            // Clear form or show success message as needed
            setFormData({
                fullName: '',
                email: '',
                username: '',
                password: '',
                description: ''
            });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="user-form-container">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Add User</button>
                </div>
            </form>
        </div>
    );
};

export default Users;
