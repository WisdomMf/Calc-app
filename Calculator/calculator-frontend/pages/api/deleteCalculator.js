import connectToDatabase from '../../utils/db';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { calculatorId } = req.query;

    if (!calculatorId) {
        return res.status(400).json({ success: false, message: 'Calculator ID is required' });
    }

    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('calculators').deleteOne({ id: calculatorId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Calculator not found' });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Failed to delete calculator:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
