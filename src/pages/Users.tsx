import { Layout } from "@/components/Layout";
import { UserTable } from "@/components/UserTable";
import { DbCredentialsManager } from "@/components/DbCredentialsManager";

const Users = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <DbCredentialsManager />
        <UserTable />
      </div>
    </Layout>
  );
};

export default Users;