import { Layout } from "@/components/Layout";
import { UserTable } from "@/components/UserTable";

const Users = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <UserTable />
      </div>
    </Layout>
  );
};

export default Users;