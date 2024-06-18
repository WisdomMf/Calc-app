import connectToDatabase from '../../utils/db';

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        const calculators = await db.collection('calculators').find().toArray();
        res.status(200).json({ success: true, calculators });
    } catch (error) {
        console.error('Failed to fetch calculators:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
