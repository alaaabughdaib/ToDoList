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
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
};

// Create new user
export const createUserController = async (req: Request, res: Response) => {
    const { name, email, password, gender } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword, gender);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};

// User login
export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).send('Error during login');
    }
};

// Get user with tasks
export const getUserWithTasksController = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await getUserWithTasks(Number(userId));
        user ? res.json(user) : res.status(404).send('User not found');
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
};

// Update user
export const updateUserController = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email, password, gender } = req.body;
    try {
        const updatedUser = await updateUser(Number(userId), name, email, password, gender);
        updatedUser ? res.json(updatedUser) : res.status(404).send('User not found');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};

// Delete user
export const deleteUserController = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const deletedUser = await deleteUser(Number(userId));
        deletedUser ? res.status(204).send() : res.status(404).send('User not found');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};