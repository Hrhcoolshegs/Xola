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
  Shield,
  Key,
  Edit,
  Trash2,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const UserManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock user data
  const users = [
    {
      id: 'U001',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-02-20 09:30',
      permissions: ['all'],
    },
    {
      id: 'U002',
      name: 'Dr. James Wilson',
      email: 'james.wilson@example.com',
      role: 'Doctor',
      status: 'active',
      lastLogin: '2024-02-19 14:15',
      permissions: ['view_patients', 'edit_treatments'],
    },
    {
      id: 'U003',
      name: 'Emma Thompson',
      email: 'emma.thompson@example.com',
      role: 'Receptionist',
      status: 'inactive',
      lastLogin: '2024-02-15 11:20',
      permissions: ['view_appointments', 'edit_appointments'],
    },
  ];

  const roles = [
    {
      name: 'Admin',
      description: 'Full system access and management',
      permissions: ['all'],
    },
    {
      name: 'Doctor',
      description: 'Patient and treatment management',
      permissions: ['view_patients', 'edit_treatments'],
    },
    {
      name: 'Receptionist',
      description: 'Appointment and schedule management',
      permissions: ['view_appointments', 'edit_appointments'],
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">Manage system users and permissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" icon={<UserPlus size={16} />}>
            Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {roles.map(role => (
          <Card key={role.name}>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <Shield size={24} className="text-[#0073b9] mr-2" />
                <h3 className="text-lg font-medium text-gray-800">{role.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, index) => (
                  <Badge key={index} variant="primary" size="sm">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
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
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
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

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#0073b9] flex items-center justify-center text-white">
                        <User size={20} />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="primary" size="sm">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={user.status === 'active' ? 'success' : 'danger'}
                      size="sm"
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-[#0073b9] hover:bg-[#0073b9]/10 rounded"
                        title="Edit User"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                        title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {user.status === 'active' ? (
                          <Lock size={16} />
                        ) : (
                          <Unlock size={16} />
                        )}
                      </button>
                      <button
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
          <div className="space-y-3">
            {[
              {
                type: 'success',
                message: 'New user account created for Dr. James Wilson',
                time: '2 hours ago',
              },
              {
                type: 'warning',
                message: 'Failed login attempt for user emma.thompson@example.com',
                time: '5 hours ago',
              },
              {
                type: 'info',
                message: 'User permissions updated for Sarah Chen',
                time: '1 day ago',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg flex items-start ${
                  activity.type === 'success'
                    ? 'bg-green-50'
                    : activity.type === 'warning'
                    ? 'bg-yellow-50'
                    : 'bg-blue-50'
                }`}
              >
                {activity.type === 'success' ? (
                  <CheckCircle
                    size={20}
                    className="text-green-500 mt-0.5 mr-3 flex-shrink-0"
                  />
                ) : activity.type === 'warning' ? (
                  <AlertCircle
                    size={20}
                    className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0"
                  />
                ) : (
                  <Shield
                    size={20}
                    className="text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <p className="text-gray-800">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;