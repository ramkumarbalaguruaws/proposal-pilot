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
import { executeQuery } from "@/utils/db";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const UserTable = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await executeQuery('SELECT * FROM users');
      return result as User[];
    },
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: Partial<User>) => {
      await executeQuery(
        'INSERT INTO users (username, email, role, created_at) VALUES (?, ?, ?, ?)',
        [userData.username, userData.email, userData.role, new Date().toISOString()]
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User created",
        description: "The new user has been successfully created.",
      });
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (userData: User) => {
      await executeQuery(
        'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
        [userData.username, userData.email, userData.role, userData.id]
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User updated",
        description: "The user has been successfully updated.",
      });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      await executeQuery('DELETE FROM users WHERE id = ?', [userId]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User deleted",
        description: "The user has been successfully deleted.",
      });
    },
  });

  const handleCreateUser = () => {
    setSelectedUser(undefined);
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      updateUserMutation.mutate({ ...selectedUser, ...userData });
    } else {
      createUserMutation.mutate(userData);
    }
    setDialogOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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