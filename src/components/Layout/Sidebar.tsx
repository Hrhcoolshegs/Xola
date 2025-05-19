import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  LineChart, 
  PillIcon, 
  FileText, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Syringe,
  ClipboardList,
  Clipboard
} from 'lucide-react';

const Sidebar = () => {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: t('nav.dashboard'), to: '/', icon: LayoutDashboard },
    { name: t('nav.patients'), to: '/patients', icon: Users },
    { name: t('nav.appointments'), to: '/appointments', icon: Calendar },
    { name: t('nav.clinical'), to: '/clinical', icon: Stethoscope },
    { name: 'Treatment Plans', to: '/treatment', icon: Clipboard },
    { name: t('nav.treatment'), to: '/treatment/list', icon: ClipboardList },
    { name: t('nav.analytics'), to: '/analytics', icon: LineChart },
    { name: t('nav.medications'), to: '/medications', icon: PillIcon },
    { name: t('nav.reports'), to: '/reports', icon: FileText },
    { name: t('nav.settings'), to: '/settings', icon: Settings },
    { name: t('nav.support'), to: '/support', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div 
      className={`bg-white shadow-md transition-all duration-300 relative ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <div className="text-[#0073b9] relative">
            <Syringe size={32} strokeWidth={2} className="transform -rotate-45" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#56c4c5] rounded-full" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-xl font-bold text-[#0073b9]">Xola</h1>
              <p className="text-xs text-[#56c4c5]">SmartCare</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#0073b9] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center">
                  <item.icon size={20} strokeWidth={2} />
                  {!collapsed && <span className="ml-4">{item.name}</span>}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;