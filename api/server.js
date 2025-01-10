const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});