import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useTheme } from '../context/ThemeContext';
import dynamic from 'next/dynamic';
import TaxCalculator from '../components/TaxCalculator'; // Ensure this path is correct
import styles from '../styles/AdminDashboard.module.css';

const CodeEditor = dynamic(
    async () => {
        await import('codemirror/lib/codemirror.css');
        await import('codemirror/theme/material.css');
        await import('codemirror/mode/javascript/javascript');

        const { UnControlled: CodeMirror } = await import('react-codemirror2');
        return CodeMirror;
    },
    { ssr: false }
);

const AdminDashboard = () => {
    const { isAdmin } = useAdmin();
    const { theme } = useTheme();
    const [selectedCalculator, setSelectedCalculator] = useState('basic');
    const [frontendCode, setFrontendCode] = useState('');
    const [backendCode, setBackendCode] = useState('');
    const [activeTab, setActiveTab] = useState('frontend');

    const calculators = [
        { name: 'Basic Calculator', id: 'basic' },
        { name: 'Scientific Calculator', id: 'scientific' },
        { name: 'Programmer Calculator', id: 'programmer' },
        { name: 'Income Tax Calculator', id: 'incomeTax' }
    ];

    const fetchCalculatorCode = async (calculatorId) => {
        const response = await fetch(`/api/getCalculatorCode?calculatorId=${calculatorId}`);
        const data = await response.json();
        if (data.success) {
            setFrontendCode(data.frontendCode || '');
            setBackendCode(data.backendCode || '');
        } else {
            setFrontendCode('');
            setBackendCode('');
        }
    };

    useEffect(() => {
        fetchCalculatorCode(selectedCalculator);
    }, [selectedCalculator]);

    useEffect(() => {
        fetchCalculatorCode('basic');
    }, []);

    const handleSaveCode = async () => {
        try {
            const response = await fetch('/api/saveCalculatorCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    calculatorId: selectedCalculator,
                    frontendCode,
                    backendCode
                })
            });

            const data = await response.json();
            if (data.success) {
                alert('Code updated successfully');
            } else {
                alert('Failed to update code');
            }
        } catch (error) {
            console.error('Failed to save calculator code:', error);
            alert('Failed to update code');
        }
    };

    return (
        <div className={`${styles.dashboard} ${theme}`}>
            <div className={styles.content}>
                <div className={styles.calculatorSection}>
                    <div className={styles.dropdownContainer}>
                        <select onChange={e => setSelectedCalculator(e.target.value)} value={selectedCalculator}>
                            <option value="">Select Calculator</option>
                            {calculators.map(calc => (
                                <option key={calc.id} value={calc.id}>{calc.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.calculatorPreview}>
                        {selectedCalculator === 'incomeTax' ? (
                            <TaxCalculator onCalculate={(formData) => console.log('Calculate', formData)} />
                        ) : (
                            <div>Select an income tax calculator to preview</div>
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
                            {activeTab === 'frontend' && (
                                <CodeEditor
                                    value={frontendCode}
                                    options={{
                                        mode: 'javascript',
                                        theme: 'material',
                                        lineNumbers: true
                                    }}
                                    onChange={(editor, data, value) => setFrontendCode(value)}
                                />
                            )}
                            {activeTab === 'backend' && (
                                <CodeEditor
                                    value={backendCode}
                                    options={{
                                        mode: 'javascript',
                                        theme: 'material',
                                        lineNumbers: true
                                    }}
                                    onChange={(editor, data, value) => setBackendCode(value)}
                                />
                            )}
                            <button onClick={handleSaveCode}>Save Code</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
