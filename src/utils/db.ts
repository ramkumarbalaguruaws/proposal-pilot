// Mock data service for development
const mockData = {
  proposals: [
    {
      id: 1,
      projectName: "Global Satellite Network Expansion",
      priority: "P1",
      country: "United States",
      bandwidth: "500 MHz",
      gateway: "GW-NAM-01",
      terminalCount: 1500,
      terminalType: "VSATs",
      customer: "TechCorp International",
      salesDirector: "Sarah Johnson",
      submissionDate: "2024-01-15",
      proposalLink: "https://proposals.example.com/gne-2024",
      commercialValue: 2500000,
      status: "ongoing",
      remarks: "Awaiting final technical review",
    },
    {
      id: 2,
      projectName: "Maritime Connectivity Solution",
      priority: "P2",
      country: "Singapore",
      bandwidth: "200 MHz",
      gateway: "GW-APAC-03",
      terminalCount: 750,
      terminalType: "Maritime Terminals",
      customer: "Ocean Shipping Co",
      salesDirector: "Michael Chen",
      submissionDate: "2024-01-20",
      proposalLink: "https://proposals.example.com/mcs-2024",
      commercialValue: 1200000,
      status: "ongoing",
      remarks: "Client requested additional coverage details",
    },
    {
      id: 3,
      projectName: "Rural Broadband Initiative",
      priority: "P1",
      country: "Brazil",
      bandwidth: "300 MHz",
      gateway: "GW-SAM-02",
      terminalCount: 2000,
      terminalType: "Consumer Terminals",
      customer: "ConnectBR",
      salesDirector: "Ana Silva",
      submissionDate: "2024-01-10",
      proposalLink: "https://proposals.example.com/rbi-2024",
      commercialValue: 3000000,
      status: "blocked",
      remarks: "Pending regulatory approval",
    },
    {
      id: 4,
      projectName: "Urban 5G Integration",
      priority: "P1",
      country: "Japan",
      bandwidth: "400 MHz",
      gateway: "GW-APAC-01",
      terminalCount: 3000,
      terminalType: "5G Terminals",
      customer: "TelecomJP",
      salesDirector: "Yuki Tanaka",
      submissionDate: "2024-02-01",
      proposalLink: "https://proposals.example.com/5g-2024",
      commercialValue: 4500000,
      status: "closed",
      remarks: "Successfully implemented",
    },
    {
      id: 5,
      projectName: "Desert Connectivity Project",
      priority: "P2",
      country: "United Arab Emirates",
      bandwidth: "250 MHz",
      gateway: "GW-ME-02",
      terminalCount: 1000,
      terminalType: "Mobile Terminals",
      customer: "UAE Connect",
      salesDirector: "Mohammed Al-Said",
      submissionDate: "2024-02-15",
      proposalLink: "https://proposals.example.com/dcp-2024",
      commercialValue: 2800000,
      status: "ongoing",
      remarks: "Technical assessment in progress",
    }
  ],
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
    // Return mock data based on the query
    if (query.toLowerCase().includes('proposals')) {
      return mockData.proposals;
    }
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
  console.log('Mock database initialized with sample data');
}

export { executeQuery, testConnection };