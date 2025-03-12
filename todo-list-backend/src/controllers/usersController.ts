import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
    getUsers,
    createUser,
    getUserWithTasks,
    updateUser,
    deleteUser,
    getUserByEmail
} from '../models/usersModel';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;

// Get all users
export const getUsersController = async (req: Request, res: Response) => {
    console.log('GET /users request received');
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
};

// Create new user
export const createUserController = async (req: Request, res: Response) => {
    console.log('POST /users request received with body:', req.body);
    const { name, email, password, gender } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword, gender);

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
};


// User login
export const loginUserController = async (req: Request, res: Response) => {
    console.log('POST /users/login request received with body:', req.body);
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        
        if (!user) {
            console.warn('Login failed: Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.warn('Login failed: Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

    
        const userData = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
            ,
            gender : user.gender
        };

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
        
        console.log('User logged in successfully:', user.email);
        res.json({ 
            token, 
            user: userData // Include user data in the response
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
};

// Get user with tasks
export const getUserWithTasksController = async (req: Request, res: Response) => {
    console.log('GET /users/:userId request received with params:', req.params);
    const { userId } = req.params;
    try {
        const user = await getUserWithTasks(Number(userId));
        user ? res.json(user) : res.status(404).send('User not found');
    } catch (error) {
        console.error('Error fetching user with tasks:', error);
        res.status(500).send('Error fetching user');
    }
};

// Update user
export const updateUserController = async (req: Request, res: Response) => {
    console.log('PUT /users/:userId request received with params:', req.params, 'and body:', req.body);
    const { userId } = req.params;
    const { name, email, password, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const updatedUser = await updateUser(Number(userId), name, email, hashedPassword, gender);
        updatedUser ? res.json(updatedUser) : res.status(404).send('User not found');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
};

// Delete user
export const deleteUserController = async (req: Request, res: Response) => {
    console.log('DELETE /users/:userId request received with params:', req.params);
    const { userId } = req.params;
    try {
        const deletedUser = await deleteUser(Number(userId));
        deletedUser ? res.status(204).send() : res.status(404).send('User not found');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
};
