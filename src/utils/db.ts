// Mock data service for development
const mockData = {
  proposals: [],
  users: []
};

// Get credentials from localStorage for development
const getDbConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    const storedConfig = localStorage.getItem('dbConfig');
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
  }
  
  // Fall back to environment variables or defaults
  return {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'proposal_db'
  };
};

// Function to set development credentials
export const setDbCredentials = (credentials: {
  host: string;
  user: string;
  password: string;
  database: string;
}) => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('dbConfig', JSON.stringify(credentials));
    console.log('Database credentials stored for development');
  }
};

// Mock connection test
const testConnection = async () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Mock database connection successful');
    return true;
  }
  
  try {
    const response = await fetch('/api/test-connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getDbConfig())
    });
    
    if (!response.ok) {
      throw new Error('Database connection failed');
    }
    
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

// Mock query executor
const executeQuery = async (query: string, params?: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Mock query executed:', query, params);
    return [];
  }

  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        params,
        ...getDbConfig()
      })
    });

    if (!response.ok) {
      throw new Error('Query execution failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// Initialize mock data
if (process.env.NODE_ENV === 'development') {
  console.log('Mock database initialized');
}

export { executeQuery, testConnection };