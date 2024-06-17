// components/TaxCalculator.js
import React, { useState } from 'react';

const TaxCalculator = ({ onCalculate }) => {
    const [formData, setFormData] = useState({
        propertyIncome: '',
        tradingIncome: '',
        employmentIncome: '',
        savingsIncome: '',
        dividendIncome: '',
        taxYear: '2023'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="propertyIncome" placeholder="Property Income" value={formData.propertyIncome} onChange={handleChange} />
            <input type="number" name="tradingIncome" placeholder="Trading Income" value={formData.tradingIncome} onChange={handleChange} />
            <input type="number" name="employmentIncome" placeholder="Employment Income" value={formData.employmentIncome} onChange={handleChange} />
            <input type="number" name="savingsIncome" placeholder="Savings Income" value={formData.savingsIncome} onChange={handleChange} />
            <input type="number" name="dividendIncome" placeholder="Dividend Income" value={formData.dividendIncome} onChange={handleChange} />
            <select name="taxYear" value={formData.taxYear} onChange={handleChange}>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
            </select>
            <button type="submit">Calculate Tax</button>
        </form>
    );
};

export default TaxCalculator;
