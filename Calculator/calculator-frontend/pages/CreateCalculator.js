import React, { useState } from 'react';
import styles from '../styles/CreateCalculator.module.css';

const CreateCalculator = () => {
    const [name, setName] = useState('');
    const [frontendCode, setFrontendCode] = useState('');
    const [backendCode, setBackendCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/createCalculator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, frontendCode, backendCode }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Calculator created successfully!');
                // Optionally redirect or reset form
            } else {
                alert('Failed to create calculator');
            }
        } catch (error) {
            console.error('Error creating calculator:', error);
            alert('Error creating calculator');
        }
    };

    return (
        <div className={`${styles.container} ${styles.light}`}> {/* Adjust based on the theme */}
            <h1 className="text-center">Create Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formField}>
                    <label htmlFor="name">Calculator Name:</label>
                    <input
                        type="text"
                        className={styles.inputText}
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="frontendCode">Frontend Code:</label>
                    <textarea
                        className={styles.largeInput}
                        id="frontendCode"
                        value={frontendCode}
                        onChange={(e) => setFrontendCode(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="backendCode">Backend Code:</label>
                    <textarea
                        className={styles.largeInput}
                        id="backendCode"
                        value={backendCode}
                        onChange={(e) => setBackendCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Create Calculator</button>
            </form>
        </div>
    );
};

export default CreateCalculator;
