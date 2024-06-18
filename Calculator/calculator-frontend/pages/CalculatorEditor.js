import React, { useEffect, useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useTheme } from '../context/ThemeContext';
import dynamic from 'next/dynamic';
import styles from '../styles/Calculator-Editor.module.css';

const CodeEditor = dynamic(
    async () => {
        await import('codemirror/lib/codemirror.css');
        await import('codemirror/theme/material.css');
        await import('codemirror/mode/javascript/javascript');
        await import('codemirror/mode/htmlmixed/htmlmixed');
        const { UnControlled: CodeMirror } = await import('react-codemirror2');
        return CodeMirror;
    },
    { ssr: false }
);

const CalculatorEditor = () => {
    const { isAdmin } = useAdmin();
    const { theme } = useTheme();
    const [selectedCalculator, setSelectedCalculator] = useState(null);
    const [calculators, setCalculators] = useState([]);
    const [frontendCode, setFrontendCode] = useState('');
    const [backendCode, setBackendCode] = useState('');
    const [activeTab, setActiveTab] = useState('frontend');
    const [newCalculator, setNewCalculator] = useState({
        name: '',
        frontendCode: '',
        backendCode: ''
    });
    const codeMirrorRef = useRef();

    useEffect(() => {
        fetchCalculators();
    }, []);

    useEffect(() => {
        if (selectedCalculator) {
            fetchCalculatorCode(selectedCalculator);
        }
    }, [selectedCalculator]);

    useEffect(() => {
        renderCodePreview();
    }, [frontendCode, backendCode]);

    const fetchCalculators = async () => {
        try {
            const response = await fetch('/api/getCalculators');
            const data = await response.json();
            if (data.success) {
                setCalculators(data.calculators);
                if (data.calculators.length > 0) {
                    setSelectedCalculator(data.calculators[0].id);
                }
            } else {
                console.error('Failed to fetch calculators:', data.message);
            }
        } catch (error) {
            console.error('Error fetching calculators:', error);
        }
    };

    const fetchCalculatorCode = async (calculatorId) => {
        try {
            const response = await fetch(`/api/getCalculatorCode?calculatorId=${calculatorId}`);
            const data = await response.json();
            if (data.success) {
                setFrontendCode(data.frontendCode || '');
                setBackendCode(data.backendCode || '');
            } else {
                console.error('Failed to fetch calculator code:', data.message);
                setFrontendCode('');
                setBackendCode('');
            }
        } catch (error) {
            console.error('Error fetching calculator code:', error);
        }
    };

    const handleSaveCode = async () => {
        try {
            const response = await fetch('/api/saveCalculatorCode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

    const handleCreateCalculator = async () => {
        try {
            const response = await fetch('/api/createCalculator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCalculator)
            });

            const data = await response.json();
            if (data.success) {
                alert('Calculator created successfully!');
                fetchCalculators(); // Refresh the calculator list
                setSelectedCalculator(data.id); // Optionally select the newly created calculator
            } else {
                alert('Failed to create calculator');
            }
        } catch (error) {
            console.error('Error creating calculator:', error);
            alert('Error creating calculator');
        }
    };

    const handleDeleteCalculator = async () => {
        if (!selectedCalculator) {
            alert('No calculator selected for deletion');
            return;
        }
        try {
            const response = await fetch(`/api/deleteCalculator?calculatorId=${selectedCalculator}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                alert('Calculator deleted successfully');
                fetchCalculators(); // Refresh the calculator list
                setSelectedCalculator(null); // Clear selected calculator
            } else {
                alert('Failed to delete calculator');
            }
        } catch (error) {
            console.error('Error deleting calculator:', error);
            alert('Error deleting calculator');
        }
    };

    const renderCodePreview = () => {
        const previewElement = document.getElementById('calculator-preview');
        if (previewElement) {
            previewElement.innerHTML = frontendCode;

            // Create a new script element to execute the backend code
            const scriptElement = document.createElement('script');
            scriptElement.innerHTML = backendCode;

            // Append the script element to the preview element
            previewElement.appendChild(scriptElement);
        }
    };

    return (
        <div className={`${styles.dashboard} ${theme}`}>
            <div className={styles.content}>
                <div className={styles.calculatorSection}>
                    <div className={styles.dropdownContainer}>
                        <select onChange={e => setSelectedCalculator(e.target.value)} value={selectedCalculator || ''}>
                            <option value="">Select Calculator</option>
                            {calculators.map(calc => (
                                <option key={calc.id} value={calc.id}>{calc.name}</option>
                            ))}
                        </select>
                        {selectedCalculator && (
                            <button onClick={handleDeleteCalculator}>Delete Calculator</button>
                        )}
                    </div>
                    <div className={styles.calculatorPreview}>
                        <div>Calculator Preview</div>
                        <div id="calculator-preview"></div>
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
                                    editorDidMount={(editor) => { codeMirrorRef.current = editor; }}
                                    value={frontendCode}
                                    options={{
                                        mode: 'htmlmixed',
                                        theme: 'material',
                                        lineNumbers: true
                                    }}
                                    onChange={(editor, data, value) => setFrontendCode(value)}
                                />
                            )}
                            {activeTab === 'backend' && (
                                <CodeEditor
                                    editorDidMount={(editor) => { codeMirrorRef.current = editor; }}
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

export default CalculatorEditor;
