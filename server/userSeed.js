import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
    await connectToDatabase();
    console.log("Seeding Admin User");
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        });
        console.log("User Created");
        await newUser.save();
    } catch (error) {
        console.error("Error inserting user:", error);
    } finally {
        process.exit();
    }
};

userRegister();
