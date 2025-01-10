import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// SQL for creating database and necessary tables
const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``;
const CREATE_PROPOSALS_TABLE = `
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
    proposalLink VARCHAR(255),
    commercialValue DECIMAL(15,2),
    status VARCHAR(50),
    remarks TEXT,
    user_id INT
  )
`;

// Initialize database and create tables
async function initializeDatabase() {
  try {
    // First connect without database to create it if needed
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '3306'),
    });

    console.log('Connected to RDS successfully');
    
    // Create database if it doesn't exist
    await connection.query(CREATE_DATABASE);
    console.log('Database created/verified successfully');
    
    // Close initial connection
    await connection.end();
    
    // Reconnect with database selected
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '3306'),
    });
    
    // Create tables
    await dbConnection.query(CREATE_PROPOSALS_TABLE);
    console.log('Tables created/verified successfully');
    
    await dbConnection.end();
  } catch (error) {
    console.error('Database initialization error:', error);
    // Don't exit the process, just log the error
  }
}

app.post('/api/query', async (req, res) => {
  const { query, params, credentials } = req.body;
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || credentials.host,
      user: process.env.DB_USER || credentials.user,
      password: process.env.DB_PASSWORD || credentials.password,
      database: process.env.DB_NAME || credentials.database,
      port: parseInt(process.env.DB_PORT || credentials.port),
    });

    const [results] = await connection.execute(query, params);
    await connection.end();
    
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

// Initialize database before starting the server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});