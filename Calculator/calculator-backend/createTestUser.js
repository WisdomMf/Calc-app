const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createAdminUser() {
    const uri = process.env.MONGO_URI; // MongoDB connection string
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const database = client.db("mydatabase"); // Replace 'mydatabase' with your database name
    const users = database.collection("users");

    const username = 'adminUser'; // Change to a unique username
    const password = 'password'; // Consider using a more secure way to handle passwords in real applications
    const saltRounds = 10;
    const role = 'Admin'; // Set the role to 'Admin'

    try {
        await client.connect();

        // Check if the user already exists
        const existingUser = await users.findOne({ username: username });
        if (existingUser) {
            console.log(`User with username ${username} already exists.`);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await users.insertOne({
            username: username,
            password: hashedPassword,
            role: role // Add the role field
        });
        console.log('Admin user created successfully:', result);
    } catch (err) {
        console.error('Error creating admin user:', err.message);
    } finally {
        await client.close();
    }
}

createAdminUser().catch(console.error);
