import dbConnect from '../utils/dbConnect';
import Calculator from '../models/Calculator';
import calculatorConfig from '../config/calculatorConfig';

const insertCalculatorConfig = async () => {
    await dbConnect();

    for (const [id, config] of Object.entries(calculatorConfig)) {
        await Calculator.updateOne(
            { id },
            { 
                title: config.title,
                frontendCode: config.frontendCode,
                backendCode: config.backendCode
            },
            { upsert: true } // Create if not exist, update if exist
        );
    }

    console.log('Initial calculator configurations have been inserted into the database.');
};

insertCalculatorConfig().catch(error => {
    console.error('Failed to insert calculator configurations:', error);
}).finally(() => {
    process.exit();
});
