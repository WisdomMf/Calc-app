// components/IncomeTaxCalculator.js
import React, { useEffect } from 'react';

const IncomeTaxCalculator = ({ onIncomeTypeChange, onIncomeChange, onRecalculate }) => {
    useEffect(() => {
        onRecalculate();
    }, []);

    return (
        <div>
            <h2>Income Tax Calculator</h2>
            <label htmlFor="incomeType">Select Tax Year:</label>
            <select id="incomeType" onChange={onIncomeTypeChange}>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023" selected>2023</option>
                <option value="2024">2024</option>
            </select>

            <label htmlFor="propertyIncome">Property Income:</label>
            <input type="text" id="propertyIncome" onChange={onIncomeChange} placeholder="Enter property income" />

            <label htmlFor="tradingIncome">Trading Income:</label>
            <input type="text" id="tradingIncome" onChange={onIncomeChange} placeholder="Enter trading income" />

            <label htmlFor="employmentIncome">Employment Income:</label>
            <input type="text" id="employmentIncome" onChange={onIncomeChange} placeholder="Enter employment income" />

            <label htmlFor="savingsIncome">Savings Income:</label>
            <input type="text" id="savingsIncome" onChange={onIncomeChange} placeholder="Enter savings income" />

            <label htmlFor="dividendIncome">Dividend Income:</label>
            <input type="text" id="dividendIncome" onChange={onIncomeChange} placeholder="Enter dividend income" />

            <h3>Results</h3>
            <label htmlFor="nonSavingTax">Non-Saving Income Tax:</label>
            <input type="text" id="nonSavingTax" readOnly />

            <label htmlFor="savingTax">Saving Income Tax:</label>
            <input type="text" id="savingTax" readOnly />

            <label htmlFor="dividendTax">Dividend Income Tax:</label>
            <input type="text" id="dividendTax" readOnly />

            <label htmlFor="totalTax">Total Tax:</label>
            <input type="text" id="totalTax" readOnly />
        </div>
    );
};

export default IncomeTaxCalculator;
