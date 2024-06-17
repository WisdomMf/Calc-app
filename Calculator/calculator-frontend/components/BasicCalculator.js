import React, { useState } from 'react';

const BasicCalculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(0);

    const handleButtonClick = (value) => {
        setInput(input + value);
    };

    const calculateResult = () => {
        try {
            setResult(eval(input));  // Be cautious using eval in production
        } catch (error) {
            setResult("Error");
        }
    };

    const clearInput = () => {
        setInput("");
        setResult(0);
    };

    return (
        <div>
            <div>
                <input type="text" value={input} readOnly />
                <div>= {result}</div>
            </div>
            <div>
                <button onClick={() => handleButtonClick("1")}>1</button>
                <button onClick={() => handleButtonClick("2")}>2</button>
                <button onClick={() => handleButtonClick("3")}>3</button>
                <button onClick={() => handleButtonClick("+")}>+</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick("4")}>4</button>
                <button onClick={() => handleButtonClick("5")}>5</button>
                <button onClick={() => handleButtonClick("6")}>6</button>
                <button onClick={() => handleButtonClick("-")}>-</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick("7")}>7</button>
                <button onClick={() => handleButtonClick("8")}>8</button>
                <button onClick={() => handleButtonClick("9")}>9</button>
                <button onClick={() => handleButtonClick("*")}>*</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick("0")}>0</button>
                <button onClick={() => clearInput()}>C</button>
                <button onClick={calculateResult}>=</button>
                <button onClick={() => handleButtonClick("/")}>/</button>
            </div>
        </div>
    );
};

export default BasicCalculator;
