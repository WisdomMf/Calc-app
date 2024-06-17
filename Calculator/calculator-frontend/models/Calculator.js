import mongoose from 'mongoose';

const CalculatorSchema = new mongoose.Schema({
    calculatorId: {
        type: String,
        required: true,
        unique: true
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

const Calculator = mongoose.models.Calculator || mongoose.model('Calculator', CalculatorSchema);
export default Calculator;
