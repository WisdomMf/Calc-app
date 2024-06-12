import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/protected-route', {
                headers: {
                    'auth-token': token
                }
            });
            setData(response.data);
        } catch (err) {
            setError('Error fetching protected data: ' + err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard!</h1>
            {data ? <p>{data}</p> : <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};
export default Dashboard;