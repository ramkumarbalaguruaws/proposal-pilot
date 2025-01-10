export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string;
  lastLogin?: string;
}