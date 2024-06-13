// /pages/dashboard.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('basic');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:5000/protected-route', {
                    headers: { 'auth-token': token }
                });
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching protected data:', err.message);
                if (err.response && err.response.status === 401) {
                    router.push('/login');
                }
            }
        };
        fetchData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        router.push('/login');
    };

    return (
        <div className={styles.dashboard}>
            <Sidebar setActiveItem={setActiveItem} handleLogout={handleLogout} />
            <div className={styles.contentArea}>
                <MainContent activeItem={activeItem} />
            </div>
        </div>
    );
};

export default Dashboard;
