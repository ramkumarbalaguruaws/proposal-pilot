import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: 'your-aws-rds-endpoint',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
  ssl: {
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const executeQuery = async <T>(query: string, params?: any[]): Promise<T> => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows as T;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

// Example query to create proposals table
export const createProposalsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS proposals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      projectName VARCHAR(255) NOT NULL,
      priority ENUM('P1', 'P2', 'P3') NOT NULL,
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
      status ENUM('ongoing', 'blocked', 'closed') DEFAULT 'ongoing',
      remarks TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  await executeQuery(query);
};

// Example query to create users table
export const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  await executeQuery(query);
};