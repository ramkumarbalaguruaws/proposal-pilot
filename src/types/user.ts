export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
  password?: string; // Optional because we don't always want to include it in responses
  createdAt?: string;
  lastLogin?: string;
}