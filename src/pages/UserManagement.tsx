import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  User,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Shield,
  Key,
  Mail,
  Phone,
  Calendar,
  Check,
  X,
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'staff';
  status: 'active' | 'inactive';
  lastLogin: string;
  phone: string;
  joinDate: string;
  permissions: string[];
}

const UserManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  // Mock user data
  const users: UserData[] = [
    {
      id: 'U001',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-02-20 09:30',
      phone: '(416) 555-0123',
      joinDate: '2023-01-15',
      permissions: ['all_access', 'manage_users', 'manage_billing']
    },
    {
      id: 'U002',
      name: 'Dr. James Wilson',
      email: 'james.wilson@example.com',
      role: 'doctor',
      status: 'active',
      lastLogin: '2024-02-19 14:45',
      phone: '(416) 555-0124',
      joinDate: '2023-02-01',
      permissions: ['view_patients', 'manage_treatments', 'view_analytics']
    },
    {
      id: 'U003',
      name: 'Emily Brown',
      email: 'emily.brown@example.com',
      role: 'staff',
      status: 'active',
      lastLogin: '2024-02-20 08:15',
      phone: '(416) 555-0125',
      joinDate: '2023-03-10',
      permissions: ['view_appointments', 'manage_schedule']
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">Manage system users and their permissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<UserPlus size={16} />}
            onClick={() => setShowAddUser(true)}
          >
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button variant="outline" icon={<Filter size={16} />}>
              More Filters
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg hover:border-[#0073b9] transition-colors"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-[#0073b9] flex items-center justify-center text-white">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{user.name}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge
                          variant={user.role === 'admin' ? 'primary' : 'outline'}
                          size="sm"
                        >
                          {user.role}
                        </Badge>
                        <Badge
                          variant={user.status === 'active' ? 'success' : 'danger'}
                          size="sm"
                        >
                          {user.status}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail size={14} className="mr-2" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone size={14} className="mr-2" />
                          {user.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-2" />
                          Joined: {user.joinDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Shield size={16} />}
                    >
                      Permissions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Key size={16} />}
                    >
                      Reset Password
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Trash2 size={16} />}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700"
                      >
                        {permission.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;