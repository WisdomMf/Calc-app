// config/calculatorConfig.js
const calculatorConfig = {
    basic: {
        title: 'Basic Calculator',
        frontendCode: 'console.log("Basic Calculator Frontend Code")',
        backendCode: 'console.log("Basic Calculator Backend Code")'
    },
    scientific: {
        title: 'Scientific Calculator',
        frontendCode: 'console.log("Scientific Calculator Frontend Code")',
        backendCode: 'console.log("Scientific Calculator Backend Code")'
    },
    programmer: {
        title: 'Programmer Calculator',
        frontendCode: 'console.log("Programmer Calculator Frontend Code")',
        backendCode: 'console.log("Programmer Calculator Backend Code")'
    },
    incomeTax: {
        title: 'Income Tax Calculator',
        frontendCode: `
            import React from 'react';

            const IncomeTaxCalculator = ({ onIncomeTypeChange, onIncomeChange, onRecalculate }) => {
                React.useEffect(() => {
                    onRecalculate();
                }, []);

                return (
                    <div>
                        <h2>Income Tax Calculator</h2>
                        <label htmlFor="incomeType">Select Tax Year:</label>
                        <select id="incomeType" onChange={onIncomeTypeChange}>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                        <label htmlFor="propertyIncome">Property Income:</label>
                        <input type="text" id="propertyIncome" onChange={onIncomeChange} />
                        <label htmlFor="tradingIncome">Trading Income:</label>
                        <input type="text" id="tradingIncome" onChange={onIncomeChange} />
                        <label htmlFor="employmentIncome">Employment Income:</label>
                        <input type="text" id="employmentIncome" onChange={onIncomeChange} />
                        <label htmlFor="savingsIncome">Savings Income:</label>
                        <input type="text" id="savingsIncome" onChange={onIncomeChange} />
                        <label htmlFor="dividendIncome">Dividend Income:</label>
                        <input type="text" id="dividendIncome" onChange={onIncomeChange} />
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
        `,
        backendCode: `
            const express = require('express');
            const router = express.Router();

             const taxYearData = {
                '2021': {
                    remainingLastBandAmount: 52460,
                    startingRate: 5000,
                    maxNillRate: 1000,
                    lowerNillRate: 500,
                    divNillRate: 1000,
                    allowance: 12570,
                    basicBand: 37700,
                    basicRate: 0.20,
                    higherBand: 150000,
                    higherRate: 0.40,
                    additionalRate: 0.45,
                    divBasicRate: 0.0875,
                    divHigherRate: 0.03375,
                    divAdditionalRate: 0.03935
                },
                '2022': {
                    remainingLastBandAmount: 52460,
                    startingRate: 5000,
                    maxNillRate: 1000,
                    lowerNillRate: 500,
                    divNillRate: 1000,
                    allowance: 12570,
                    basicBand: 37700,
                    basicRate: 0.20,
                    higherBand: 150000,
                    higherRate: 0.40,
                    additionalRate: 0.45,
                    divBasicRate: 0.0875,
                    divHigherRate: 0.03375,
                    divAdditionalRate: 0.03935
                },
                '2023': {
                    remainingLastBandAmount: 42516,
                    startingRate: 5000,
                    maxNillRate: 1000,
                    lowerNillRate: 500,
                    divNillRate: 1000,
                    allowance: 12570,
                    basicBand: 37700,
                    basicRate: 0.20,
                    higherBand: 125140,
                    higherRate: 0.40,
                    additionalRate: 0.45,
                    divBasicRate: 0.0875,
                    divHigherRate: 0.03375,
                    divAdditionalRate: 0.03935
                },
                '2024': {
                    remainingLastBandAmount: 42516,
                    startingRate: 5000,
                    maxNillRate: 1000,
                    lowerNillRate: 500,
                    divNillRate: 500,
                    allowance: 12570,
                    basicBand: 37700,
                    basicRate: 0.20,
                    higherBand: 125140,
                    higherRate: 0.40,
                    additionalRate: 0.45,
                    divBasicRate: 0.0875,
                    divHigherRate: 0.03375,
                    divAdditionalRate: 0.03935
                };

            function calculateAllowance(income, yearData) {
                if (income >= 100000 && income <= 125140) {
                    return 12570 - ((income - 100000) / 2);
                } else if (income > 125140) {
                    return 0;
                } else if (income <= 12570) {
                    return income;
                } else if (income >= 12571 && income < 100000) {
                    return 12570;
                } else {
                    return yearData.allowance;
                }
            }

            router.post('/calculateTax', (req, res) => {
                const { incomeType, propertyIncome, tradingIncome, employmentIncome, savingsIncome, dividendIncome } = req.body;
                const selectedYear = taxYearData[incomeType];

                const nonSavingIncome = propertyIncome + tradingIncome + employmentIncome;
                const totalIncome = nonSavingIncome + savingsIncome + dividendIncome;
                const allowance = calculateAllowance(totalIncome, selectedYear);

                // Placeholder logic for saving and dividend tax calculations
                const savingTax = 0;  // Implement your logic for savings income tax
                const dividendTax = 0; // Implement your logic for dividend income tax
                const netNonSavingIncome = nonSavingIncome - allowance;

                let nonSavingTax = 0;
                if (netNonSavingIncome > selectedYear.basicBand) {
                    nonSavingTax += (selectedYear.basicBand * selectedYear.basicRate);
                    if (netNonSavingIncome > selectedYear.higherBand) {
                        nonSavingTax += ((netNonSavingIncome - selectedYear.higherBand) * selectedYear.additionalRate);
                    } else {
                        nonSavingTax += ((netNonSavingIncome - selectedYear.basicBand) * selectedYear.higherRate);
                    }
                } else {
                    nonSavingTax += (netNonSavingIncome * selectedYear.basicRate);
                }

                const totalTax = nonSavingTax + savingTax + dividendTax;
                res.json({ nonSavingTax, savingTax, dividendTax, totalTax });
            });

            module.exports = router;
        `
    }
};

export default calculatorConfig;
