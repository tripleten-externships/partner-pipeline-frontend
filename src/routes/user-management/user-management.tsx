import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // shadcn input
import { Select, SelectItem, SelectTrigger, SelectContent } from '@/components/ui/select'; // shadcn select
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table'; // shadcn table

type UserRole = 'Partner' | 'Mentor' | 'Lead Mentor' | 'Designer' | 'Coordinator' | 'Student';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isAdmin: boolean; // Optional field for admin users
  project: string;
  isActive: boolean;
  createdAt: string; // ISO date string
  lastLoginDate: string;
}

// --- Mock data ---
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
    role: 'Lead Mentor',
    isAdmin: true,
    project: 'Project Alpha',
    isActive: true,
    createdAt: '2023-01-15T10:00:00Z',
    lastLoginDate: '06-10-2023'
  }
];

const UserManagement: React.FC = () => {
  
const [searchTerm, setSearchTerm] = useState('');
const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');
const [selectedUsers, setSelectedUsers] = useState<string[]>([]);


  const filteredUsers = mockUsers.filter((user) => {
    return (
      (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.project.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === '' || user.role === roleFilter) &&
      (statusFilter === 'all' ||
        (statusFilter === 'Active' && user.isActive) ||
        (statusFilter === 'Inactive' && !user.isActive))
    );
  });

  const allSelected = filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.includes(user.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers(selectedUsers.filter(id => !filteredUsers.some(user => user.id === id)));
    } else {
      setSelectedUsers([
        ...selectedUsers,
        ...filteredUsers.filter(user => !selectedUsers.includes(user.id)).map(user => user.id)
      ]);
    }
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers(selectedUsers.includes(id)
      ? selectedUsers.filter(uid => uid !== id)
      : [...selectedUsers, id]);
  };

  return (
    <div className="m-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <Input 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search users..." 
          className="w-64 border"/>
       <Select value={roleFilter} onValueChange={val => setRoleFilter(val === 'all' ? '' : (val as UserRole))}>
  <SelectTrigger>
    {roleFilter || "All Roles"}
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Roles</SelectItem>
    <SelectItem value="Lead Mentor">Lead Mentor</SelectItem>
    <SelectItem value="Mentor">Mentor</SelectItem>
    <SelectItem value="Student">Student</SelectItem>
    <SelectItem value="Partner">Partner</SelectItem>
    <SelectItem value="Designer">Designer</SelectItem>
    <SelectItem value="Coordinator">Coordinator</SelectItem>
  </SelectContent>
</Select>
        <Select value={statusFilter} onValueChange={val => setStatusFilter(val as 'all' | 'Active' | 'Inactive')}>
          <SelectTrigger>
            {statusFilter === 'all' ? "All Statuses" : statusFilter}
          </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Statuses</SelectItem>
    <SelectItem value="Active">Active</SelectItem>
    <SelectItem value="Inactive">Inactive</SelectItem>
  </SelectContent>
</Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              <input
              type="checkbox"
              checked={allSelected} 
              onChange={handleSelectAll} 
              aria-label="Select all users"
              />
              </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
           {filteredUsers.map((user) => (
      <TableRow key={user.id}>
        <TableCell>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.id)}
            onChange={() => handleSelectUser(user.id)}
            aria-label={`Select user ${user.name}`}
          />
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.project}</TableCell>
       <TableCell>
          <span className={user.isActive ? 'text-green-600 font-medium' : ''}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </TableCell>
        <TableCell>{user.lastLoginDate}</TableCell>
        <TableCell>
          <Button>Edit</Button>
          <Button className="ml-2">Delete</Button>
        </TableCell>
      </TableRow>
    ))}
        </TableBody>
      </Table>
{/* Bulk Actions and Add User */}
       <div className="mt-6 flex flex-wrap gap-4 items-center">
  <Button>Add</Button>
  <Button
    disabled={selectedUsers.length === 0}
    title="Activate"
  >
    Activate
  </Button>
  <Button
    disabled={selectedUsers.length === 0}
    title="Deactivate"
  >
    Deactivate
  </Button>
</div>
    </div>
  );
};
export default UserManagement;