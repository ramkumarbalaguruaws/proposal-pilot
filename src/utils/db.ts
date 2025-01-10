import { dbConfig, apiUrl } from '../config/environment';

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

export const executeQuery = async (query: string, params: any[] = []) => {
  try {
    const response = await fetch(`${apiUrl}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        params,
        credentials: {
          host: dbConfig.host,
          user: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.database,
          port: dbConfig.port,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};