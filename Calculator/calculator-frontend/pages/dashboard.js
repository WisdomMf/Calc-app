import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/dashboard.module.css'; // Adjust the import path as necessary

const Dashboard = () => {
    const [data, setData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:5000/protected-route', {
                    headers: {
                        'auth-token': token
                    }
                });
                setData(response.data);
            } catch (err) {
                console.error('Error fetching protected data:', err.message);
                if (err.response && err.response.status === 401) {
                    router.push('/login');
                }
            }
        };

        fetchData();
    }, [router]);

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <h2>Admin Tools</h2>
                <ul>
                    <li>Tool 1</li>
                    <li>Tool 2</li>
                    <li>Tool 3</li>
                </ul>
            </div>
            <div className={styles.content}>
                <h1>Dashboard</h1>
                {data ? (
                    <div>
                        <p>{data}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
