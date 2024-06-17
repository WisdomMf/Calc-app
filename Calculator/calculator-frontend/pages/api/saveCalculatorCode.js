import dbConnect from '../../utils/dbConnect';
import Calculator from '../../models/Calculator';

export default async function handler(req, res) {
    const { calculatorId, frontendCode, backendCode } = req.body;

    await dbConnect();

    try {
        await Calculator.updateOne(
            { id: calculatorId },
            { frontendCode, backendCode },
            { upsert: true }
        );

        res.status(200).json({ success: true, message: 'Code updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update code' });
    }
}
