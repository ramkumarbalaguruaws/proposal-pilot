import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { UserDialog } from "./UserDialog";
import { User } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";

const mockData: User[] = [
  {
    id: 1,
    username: "admin",
    role: "admin",
    email: "admin@example.com",
    createdAt: "2024-01-01",
    lastLogin: "2024-03-14",
  },
  {
    id: 2,
    username: "user1",
    role: "user",
    email: "user1@example.com",
    createdAt: "2024-02-15",
    lastLogin: "2024-03-13",
  },
];

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>(mockData);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateUser = () => {
    setSelectedUser(undefined);
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted.",
    });
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userData } : user
        )
      );
      toast({
        title: "User updated",
        description: "The user has been successfully updated.",
      });
    } else {
      // Create new user
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        username: userData.username!,
        email: userData.email!,
        role: userData.role!,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
      toast({
        title: "User created",
        description: "The new user has been successfully created.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleCreateUser}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.username}</TableCell>
                <TableCell className="capitalize">{row.role}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.lastLogin || "Never"}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditUser(row)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(row.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};