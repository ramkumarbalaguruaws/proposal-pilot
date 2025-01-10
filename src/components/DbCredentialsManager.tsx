import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { setDbCredentials } from "@/utils/db";
import { toast } from "sonner";

export const DbCredentialsManager = () => {
  const [credentials, setCredentials] = useState({
    host: '',
    user: '',
    password: '',
    database: '',
    port: '3306'  // Default MySQL port
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDbCredentials(credentials);
    toast.success("Database credentials saved successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-white shadow-sm max-w-md mx-auto my-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">AWS RDS Database Credentials</h3>
        <p className="text-sm text-gray-500">Enter your AWS RDS MySQL credentials below. These will be stored securely in localStorage.</p>
      </div>
      <div className="space-y-4">
        <Input
          placeholder="Host (e.g., mydb.123456789012.region.rds.amazonaws.com)"
          value={credentials.host}
          onChange={(e) => setCredentials(prev => ({ ...prev, host: e.target.value }))}
        />
        <Input
          placeholder="Username"
          value={credentials.user}
          onChange={(e) => setCredentials(prev => ({ ...prev, user: e.target.value }))}
        />
        <Input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
        />
        <Input
          placeholder="Database name"
          value={credentials.database}
          onChange={(e) => setCredentials(prev => ({ ...prev, database: e.target.value }))}
        />
        <Input
          placeholder="Port (default: 3306)"
          value={credentials.port}
          onChange={(e) => setCredentials(prev => ({ ...prev, port: e.target.value }))}
        />
      </div>
      <Button type="submit" className="w-full">Save Credentials</Button>
      <p className="text-xs text-gray-400 text-center">
        Credentials are stored in localStorage for development purposes only.
        For production, use environment variables or AWS Secrets Manager.
      </p>
    </form>
  );
};