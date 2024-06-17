// pages/api/saveCalculatorCode.js
import connectDB from '../../lib/db';
import Calculator from '../../models/Calculator';

export default async function handler(req, res) {
    try {
        await connectDB();

        if (req.method !== 'POST') {
            return res.status(405).json({ success: false, message: 'Method not allowed' });
        }

        const { calculatorId, frontendCode, backendCode } = req.body;

        if (!calculatorId || !frontendCode || !backendCode) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        let calculator = await Calculator.findOne({ calculatorId });

        if (!calculator) {
            calculator = new Calculator({ calculatorId, frontendCode, backendCode });
        } else {
            calculator.frontendCode = frontendCode;
            calculator.backendCode = backendCode;
        }

        await calculator.save();

        res.status(200).json({ success: true, message: 'Code updated successfully' });
    } catch (error) {
        console.error('Error saving calculator code:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
