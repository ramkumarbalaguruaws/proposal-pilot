import mysql from 'mysql2/promise';
import { dbConfig } from '../config/environment';

let connection: mysql.Connection | null = null;

interface DbCredentials {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

export const setDbCredentials = (credentials: DbCredentials) => {
  localStorage.setItem('dbHost', credentials.host);
  localStorage.setItem('dbUser', credentials.user);
  localStorage.setItem('dbPassword', credentials.password);
  localStorage.setItem('dbName', credentials.database);
  localStorage.setItem('dbPort', credentials.port.toString());
};

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