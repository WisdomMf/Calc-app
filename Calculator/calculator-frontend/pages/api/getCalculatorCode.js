// pages/api/getCalculatorCode.js

import connectToDatabase from '../../utils/db';

export default async function handler(req, res) {
    const { calculatorId } = req.query;

    if (!calculatorId) {
        return res.status(400).json({ success: false, message: 'Calculator ID is required' });
    }

    try {
        const { db } = await connectToDatabase();
        const calculator = await db.collection('calculators').findOne({ id: calculatorId });

        if (!calculator) {
            return res.status(404).json({ success: false, message: 'Calculator not found' });
        }

        res.status(200).json({
            success: true,
            frontendCode: calculator.frontendCode,
            backendCode: calculator.backendCode
        });
    } catch (error) {
        console.error('Failed to fetch calculator code:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
