export const isDevelopment = process.env.NODE_ENV !== 'production';

export const dbConfig = {
  host: isDevelopment 
    ? localStorage.getItem('dbHost') 
    : process.env.DB_HOST,
  user: isDevelopment 
    ? localStorage.getItem('dbUser') 
    : process.env.DB_USER,
  password: isDevelopment 
    ? localStorage.getItem('dbPassword') 
    : process.env.DB_PASSWORD,
  database: isDevelopment 
    ? localStorage.getItem('dbName') 
    : process.env.DB_NAME,
  port: isDevelopment 
    ? Number(localStorage.getItem('dbPort')) || 3306 
    : Number(process.env.DB_PORT) || 3306,
};