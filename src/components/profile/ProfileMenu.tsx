import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Shield,
  Key,
} from 'lucide-react';
import { Button } from '../ui/Button';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: User,
      onClick: () => navigate('/settings/profile'),
    },
    {
      label: 'Account Settings',
      icon: Settings,
      onClick: () => navigate('/settings/account'),
    },
    {
      label: 'Notification Preferences',
      icon: Bell,
      onClick: () => navigate('/settings/notifications'),
    },
    {
      label: 'Privacy & Security',
      icon: Shield,
      onClick: () => navigate('/settings/privacy'),
    },
    {
      label: 'Change Password',
      icon: Key,
      onClick: () => navigate('/settings/password'),
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      onClick: () => navigate('/support'),
    },
    {
      label: 'Logout',
      icon: LogOut,
      onClick: handleLogout,
      className: 'text-red-600 hover:bg-red-50',
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full hover:bg-gray-100 p-1 pl-2 transition-colors"
      >
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-gray-800">
            {user?.name || 'Guest'}
          </p>
          <p className="text-xs text-gray-500">{user?.role || 'User'}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-[#0073b9] flex items-center justify-center text-white overflow-hidden">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={20} />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <p className="font-medium text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsOpen(false);
                  item.onClick();
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                  item.className || 'text-gray-700'
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};