import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import '../styles/global.css';

const Profile = () => {
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        username: '',
        description: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/profile', {
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            setProfile({ ...response.data, newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Profile fetch error:', error.message);
        }
    };

    const updateProfile = async () => {
        if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const dataToUpdate = {
                ...profile,
                newPassword: profile.newPassword ? profile.newPassword : undefined
            };

            const response = await axios.put('http://localhost:5000/api/profile', dataToUpdate, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });

            setProfile(response.data);
            setEditMode(false);
        } catch (error) {
            console.error('Profile update error:', error.message);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>User Profile</h2>
                <button onClick={() => setEditMode(!editMode)} className="edit-profile-button">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>
            <div className="profile-field">
                <label>Full Name:</label>
                {editMode ? (
                    <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    />
                ) : (
                    <p>{profile.fullName}</p>
                )}
            </div>
            <div className="profile-field">
                <label>Email:</label>
                {editMode ? (
                    <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                ) : (
                    <p>{profile.email}</p>
                )}
            </div>
            <div className="profile-field">
                <label>Username:</label>
                <p>{profile.username}</p>
            </div>
            <div className="profile-field">
                <label>Description:</label>
                {editMode ? (
                    <textarea
                        value={profile.description}
                        onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    />
                ) : (
                    <p>{profile.description}</p>
                )}
            </div>
            {editMode && (
                <>
                    <div className="profile-field">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={profile.newPassword}
                            onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                        />
                    </div>
                    <div className="profile-field">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={profile.confirmPassword}
                            onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                        />
                    </div>
                </>
            )}
            <div className="profile-actions">
                {editMode ? (
                    <>
                        <button onClick={updateProfile}>Save</button>
                        <button onClick={() => setEditMode(false)}>Cancel</button>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
