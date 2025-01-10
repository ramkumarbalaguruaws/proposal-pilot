export const isDevelopment = process.env.NODE_ENV !== 'production';

export const apiUrl = isDevelopment 
  ? 'http://localhost:3000'
  : import.meta.env.VITE_API_URL;

export const dbConfig = {
  host: isDevelopment 
    ? localStorage.getItem('dbHost') 
    : import.meta.env.VITE_DB_HOST,
  user: isDevelopment 
    ? localStorage.getItem('dbUser') 
    : import.meta.env.VITE_DB_USER,
  password: isDevelopment 
    ? localStorage.getItem('dbPassword') 
    : import.meta.env.VITE_DB_PASSWORD,
  database: isDevelopment 
    ? localStorage.getItem('dbName') 
    : import.meta.env.VITE_DB_NAME,
  port: isDevelopment 
    ? Number(localStorage.getItem('dbPort')) || 3306 
    : Number(import.meta.env.VITE_DB_PORT) || 3306,
};