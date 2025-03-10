import { Pool } from 'pg';


const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'to-do', 
  password: '1484', 
  port: 5432,  
});

export default pool;
