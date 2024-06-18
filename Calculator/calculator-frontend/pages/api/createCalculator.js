// pages/api/createCalculator.js

import connectToDatabase from '../../utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { name, frontendCode, backendCode } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: 'Calculator name is required' });
    }

    try {
        const { db } = await connectToDatabase();
        const calculator = {
            id: new ObjectId().toString(), // Generating a unique ID
            name,
            frontendCode,
            backendCode
        };

        const result = await db.collection('calculators').insertOne(calculator);
        if (result.insertedId) {
            res.status(201).json({ success: true, id: calculator.id });
        } else {
            res.status(500).json({ success: false, message: 'Failed to create calculator' });
        }
    } catch (error) {
        console.error('Failed to create calculator:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
