import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { User } from "@/types/user";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSave: (userData: Partial<User>) => void;
  isAdmin: boolean;
  isPasswordChange?: boolean;
}

export const UserDialog = ({
  open,
  onOpenChange,
  user,
  onSave,
  isAdmin,
  isPasswordChange = false,
}: UserDialogProps) => {
  const [userData, setUserData] = useState<Partial<User>>(
    user || {
      username: "",
      role: "user",
    }
  );
  const [password, setPassword] = useState("");

  // Reset form when dialog opens/closes or user changes
  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      setUserData({
        username: "",
        role: "user",
      });
    }
    setPassword("");
  }, [user, open]);

  const handleSave = () => {
    onSave({ ...userData, password });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={user ? "border-blue-500" : "border-green-500"}>
        <DialogHeader>
          <DialogTitle>
            {isPasswordChange 
              ? "Change Password" 
              : user 
                ? "Edit User" 
                : "Create New User"}
          </DialogTitle>
          <DialogDescription>
            {isPasswordChange
              ? "Enter your new password"
              : user
                ? `Editing user ${user.username}`
                : "Fill in the details to create a new user"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isPasswordChange && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="col-span-3"
                placeholder={user ? user.username : "Enter username"}
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
              placeholder="Enter password"
            />
          </div>
          {isAdmin && !isPasswordChange && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={userData.role}
                onValueChange={(value: 'admin' | 'user') =>
                  setUserData({ ...userData, role: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSave} variant={user ? "default" : "default"}>
            {isPasswordChange ? "Change Password" : user ? "Save Changes" : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};