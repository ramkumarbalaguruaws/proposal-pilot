import mysql from 'mysql2/promise';
import { dbConfig } from '../config/environment';

let connection: mysql.Connection | null = null;

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      port: dbConfig.port,
    });
  }
  return connection;
};

export const executeQuery = async (query: string, params: any[] = []) => {
  try {
    const conn = await getConnection();
    const [results] = await conn.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};