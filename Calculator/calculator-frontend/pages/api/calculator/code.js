import fs from 'fs';
import path from 'path';

const codeFilePath = path.resolve('.', 'public', 'calculatorCode.js');

export default function handler(req, res) {
    if (req.method === 'GET') {
        fs.readFile(codeFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read the file.' });
            }
            res.status(200).json({ frontendCode: data, backendCode: data }); // Assuming the same code for demo; adjust as needed
        });
    } else if (req.method === 'POST') {
        const { frontendCode, backendCode } = req.body;
        const codeToSave = `${frontendCode}\n${backendCode}`; // Adjust if you need separate files
        fs.writeFile(codeFilePath, codeToSave, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save the file.' });
            }
            res.status(200).json({ success: true });
        });
    }
}
