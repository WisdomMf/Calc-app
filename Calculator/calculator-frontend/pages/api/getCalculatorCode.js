import dbConnect from '../../utils/dbConnect';
import Calculator from '../../models/Calculator';

export default async function handler(req, res) {
    const { calculatorId } = req.query;

    await dbConnect();

    try {
        const calculator = await Calculator.findOne({ id: calculatorId });
        if (!calculator) {
            return res.status(404).json({ success: false, message: 'Calculator not found' });
        }

        res.status(200).json({ 
            success: true, 
            frontendCode: calculator.frontendCode, 
            backendCode: calculator.backendCode 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
