// pages/api/getCalculatorCode.js
import connectDB from '../../lib/db';
import calculatorConfig from '../../config/calculatorConfig';

export default async function handler(req, res) {
    try {
        await connectDB();

        const { calculatorId } = req.query;
        const calculator = calculatorConfig[calculatorId];

        if (calculator) {
            res.status(200).json({
                success: true,
                frontendCode: calculator.frontendCode,
                backendCode: calculator.backendCode
            });
        } else {
            res.status(404).json({ success: false, message: 'Calculator not found' });
        }
    } catch (error) {
        console.error('Error fetching calculator code:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
