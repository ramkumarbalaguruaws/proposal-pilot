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
    database: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDbCredentials(credentials);
    toast.success("Database credentials saved");
  };

  return process.env.NODE_ENV === 'development' ? (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Database Credentials (Development Only)</h3>
      <Input
        placeholder="Host"
        value={credentials.host}
        onChange={(e) => setCredentials(prev => ({ ...prev, host: e.target.value }))}
      />
      <Input
        placeholder="User"
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
        placeholder="Database"
        value={credentials.database}
        onChange={(e) => setCredentials(prev => ({ ...prev, database: e.target.value }))}
      />
      <Button type="submit">Save Credentials</Button>
    </form>
  ) : null;
};