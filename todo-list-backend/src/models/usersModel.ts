import pool from '../database';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    gender: string;
    role: string;
}


// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
    const result = await pool.query(
        'SELECT * FROM public."Users" WHERE email = $1',
        [email]
    );
    return result.rows[0] || null;
};

// Get all users with tasks
export const getUsers = async () => {
    const result = await pool.query(
        `SELECT u.*, json_agg(t.*) AS tasks 
         FROM public."Users" u
         LEFT JOIN public."Tasks" t ON u.id = t.user_id
         GROUP BY u.id`
    );
    return result.rows;
};

// Create user
export const createUser = async (
    name: string,
    email: string,
    password: string,
    gender: string
) => {
    const result = await pool.query(
        `INSERT INTO public."Users" (name, email, password, gender)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, password, gender]
    );
    return result.rows[0];
};

// Update user
export const updateUser = async (
    userId: number,
    name: string,
    email: string,
    password: string,
    gender: string
) => {
    const result = await pool.query(
        `UPDATE public."Users"
         SET name = $1, email = $2, password = $3, gender = $4
         WHERE id = $5
         RETURNING *`,
        [name, email, password, gender, userId]
    );
    return result.rows[0];
};

// Delete user
export const deleteUser = async (userId: number) => {
    const result = await pool.query(
        `DELETE FROM public."Users"
         WHERE id = $1
         RETURNING *`,
        [userId]
    );
    return result.rows[0];
};

export const getUserWithTasks = async (userId: number) => {
    const result = await pool.query(
        `SELECT u.*, json_agg(t.*) AS tasks
         FROM public."Users" u
         LEFT JOIN public."Tasks" t ON u.id = t.user_id
         WHERE u.id = $1
         GROUP BY u.id`,
        [userId]
    );
    return result.rows[0];
};