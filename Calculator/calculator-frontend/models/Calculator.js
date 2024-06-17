import mongoose from 'mongoose';

const CalculatorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    frontendCode: {
        type: String,
        required: true
    },
    backendCode: {
        type: String,
        required: true
    }
});

export default mongoose.models.Calculator || mongoose.model('Calculator', CalculatorSchema);
