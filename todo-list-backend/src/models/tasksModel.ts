import pool from '../database';

export const getTasks = async (userId: number) => {
  const result = await pool.query('SELECT * FROM public."Tasks" WHERE user_id = $1', [userId]);
  return result.rows;
};

export const createTask = async (title: string, description: string, userId: number) => {
  const result = await pool.query(
    `INSERT INTO public."Tasks" (title, description, user_id) 
     VALUES ($1, $2, $3) RETURNING *`,
    [title, description, userId]
  );
  return result.rows[0];
};

export const updateTask = async (taskId: number, title: string, description: string) => {
  const result = await pool.query(
    `UPDATE public."Tasks"
     SET title = $1, description = $2
     WHERE id = $3
     RETURNING *`,
    [title, description, taskId]
  );
  return result.rows[0];
};

export const deleteTask = async (taskId: number) => {
  const result = await pool.query(
    `DELETE FROM public."Tasks"
     WHERE id = $1
     RETURNING *`,
    [taskId]
  );
  return result.rows[0];
};
