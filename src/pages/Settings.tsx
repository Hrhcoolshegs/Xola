import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Key,
  Building2,
  Palette,
  Globe,
  Mail,
  Save,
} from 'lucide-react';

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'account', label: 'Account Settings', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'password', label: 'Password', icon: Key },
    { id: 'practice', label: 'Practice Settings', icon: Building2 },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'email', label: 'Email Settings', icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{t('nav.settings')}</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#0073b9] text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1">
          <Card>
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    Profile Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Update your personal information
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0073b9] focus:ring focus:ring-[#0073b9] focus:ring-opacity-50"
                      defaultValue="Dr. Sarah Chen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0073b9] focus:ring focus:ring-[#0073b9] focus:ring-opacity-50"
                      defaultValue="sarah.chen@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0073b9] focus:ring focus:ring-[#0073b9] focus:ring-opacity-50"
                      defaultValue="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Specialization
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0073b9] focus:ring focus:ring-[#0073b9] focus:ring-opacity-50"
                      defaultValue="General Dentistry"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0073b9] focus:ring focus:ring-[#0073b9] focus:ring-opacity-50"
                    defaultValue="Experienced dentist specializing in general and cosmetic dentistry..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" icon={<Save size={16} />}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    Notification Preferences
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage your notification settings
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Desktop Notifications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Show notifications on desktop
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        SMS Notifications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-medium text-gray-800 mb-4">
                    Notification Types
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0073b9] focus:ring-[#0073b9]"
                      />
                      <div className="ml-3">
                        <label className="font-medium text-gray-700">
                          Appointment Reminders
                        </label>
                        <p className="text-sm text-gray-500">
                          Get notified about upcoming appointments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0073b9] focus:ring-[#0073b9]"
                      />
                      <div className="ml-3">
                        <label className="font-medium text-gray-700">
                          Treatment Updates
                        </label>
                        <p className="text-sm text-gray-500">
                          Receive updates about patient treatments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0073b9] focus:ring-[#0073b9]"
                      />
                      <div className="ml-3">
                        <label className="font-medium text-gray-700">
                          System Updates
                        </label>
                        <p className="text-sm text-gray-500">
                          Get notified about system changes and maintenance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" icon={<Save size={16} />}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}

            {/* Add more tab content here */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;