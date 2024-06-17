// components/CalculatorAdminView.js
import React, { useState } from 'react';
import styles from '../styles/CalculatorAdminView.module.css';

const CalculatorAdminView = ({ isAdmin }) => {
    const [selectedCalculator, setSelectedCalculator] = useState(null);
    const [activeTab, setActiveTab] = useState('frontend');

    const calculators = [
        { name: 'Basic Calculator', id: 'basic' },
        { name: 'Scientific Calculator', id: 'scientific' },
        { name: 'Programmer Calculator', id: 'programmer' },
    ];

    const handleCalculatorChange = (e) => {
        const selected = calculators.find(calc => calc.id === e.target.value);
        setSelectedCalculator(selected);
    };

    const handleSaveCode = () => {
        const frontendCode = document.querySelector('#frontendCode').value;
        const backendCode = document.querySelector('#backendCode').value;

        fetch('/api/updateCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ frontendCode, backendCode }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Code updated successfully');
            } else {
                alert('Failed to update code');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update code');
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.calculatorSection}>
                <div className={styles.dropdownContainer}>
                    <select onChange={handleCalculatorChange}>
                        <option value="">Select Calculator</option>
                        {calculators.map(calc => (
                            <option key={calc.id} value={calc.id}>{calc.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.calculatorPreview}>
                    {selectedCalculator ? (
                        <div>{`Preview of ${selectedCalculator.name}`}</div>
                    ) : (
                        <div>Select a calculator to preview</div>
                    )}
                </div>
            </div>
            {isAdmin && (
                <div className={styles.codeSection}>
                    <div className={styles.tabs}>
                        <button onClick={() => setActiveTab('frontend')} className={activeTab === 'frontend' ? styles.activeTab : ''}>Frontend</button>
                        <button onClick={() => setActiveTab('backend')} className={activeTab === 'backend' ? styles.activeTab : ''}>Backend</button>
                    </div>
                    <div className={styles.codeEditor}>
                        {activeTab === 'frontend' ? (
                            <textarea id="frontendCode" placeholder="Edit frontend code here"></textarea>
                        ) : (
                            <textarea id="backendCode" placeholder="Edit backend code here"></textarea>
                        )}
                        <button onClick={handleSaveCode}>Save Code</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalculatorAdminView;
