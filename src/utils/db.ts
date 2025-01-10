import mysql from 'mysql2/promise';

// Connection pool configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'proposal_db',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true
  } : undefined
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

// Initialize database tables
const initializeTables = async () => {
  try {
    // Create proposals table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS proposals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        projectName VARCHAR(255) NOT NULL,
        priority VARCHAR(50),
        country VARCHAR(100),
        bandwidth VARCHAR(100),
        gateway VARCHAR(100),
        terminalCount INT,
        terminalType VARCHAR(100),
        customer VARCHAR(255),
        salesDirector VARCHAR(255),
        submissionDate DATE,
        proposalLink VARCHAR(512),
        commercialValue DECIMAL(15,2),
        status VARCHAR(50),
        remarks TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error);
    throw error;
  }
};

// Generic query executor
const executeQuery = async (query: string, params?: any[]) => {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// Initialize database on application start
testConnection()
  .then(() => initializeTables())
  .catch(console.error);

export { pool, executeQuery };