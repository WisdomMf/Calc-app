const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createTestUser() {
    const uri = process.env.MONGO_URI; // MongoDB connection string
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const database = client.db("mydatabase"); // Replace 'mydatabase' with your database name
    const users = database.collection("users");

    const username = 'admin';
    const password = 'admin'; // Consider using a more secure way to handle passwords in real applications
    const saltRounds = 10;

    try {
        await client.connect();
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await users.insertOne({
            username: username,
            password: hashedPassword
        });
        console.log('Test user created successfully:', result);
    } catch (err) {
        console.error('Error creating test user:', err.message);
    } finally {
        await client.close();
    }
}

createTestUser().catch(console.error);
