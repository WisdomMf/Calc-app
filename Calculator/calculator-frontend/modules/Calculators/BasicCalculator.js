import React, { useState } from 'react';

const BasicCalculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleClick = (value) => {
        setInput(input + value);
    };

    const handleCalculate = () => {
        try {
            setResult(eval(input).toString());
        } catch (error) {
            setResult('Error');
        }
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    return (
        <div>
            <h2>Basic Calculator</h2>
            <input type="text" value={input} readOnly />
            <input type="text" value={result} readOnly />
            <div>
                <button onClick={() => handleClick('1')}>1</button>
                <button onClick={() => handleClick('2')}>2</button>
                <button onClick={() => handleClick('3')}>3</button>
                <button onClick={() => handleClick('+')}>+</button>
            </div>
            <div>
                <button onClick={() => handleClick('4')}>4</button>
                <button onClick={() => handleClick('5')}>5</button>
                <button onClick={() => handleClick('6')}>6</button>
                <button onClick={() => handleClick('-')}>-</button>
            </div>
            <div>
                <button onClick={() => handleClick('7')}>7</button>
                <button onClick={() => handleClick('8')}>8</button>
                <button onClick={() => handleClick('9')}>9</button>
                <button onClick={() => handleClick('*')}>*</button>
            </div>
            <div>
                <button onClick={handleClear}>C</button>
                <button onClick={() => handleClick('0')}>0</button>
                <button onClick={handleCalculate}>=</button>
                <button onClick={() => handleClick('/')}>/</button>
            </div>
        </div>
    );
};

export default BasicCalculator;
