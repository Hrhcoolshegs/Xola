import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, Users, Calendar, Stethoscope, LineChart, PillIcon, FileText, Settings, HelpCircle, ChevronLeft, ChevronRight, Syringe, Clipboard } from 'lucide-react';

const Sidebar = () => {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: t('nav.dashboard'), to: '/', icon: LayoutDashboard, color: '#1e90ff' },
    { name: t('nav.patients'), to: '/patients', icon: Users, color: '#ff7f50' },
    { name: t('nav.appointments'), to: '/appointments', icon: Calendar, color: '#eab308' },
    { name: t('nav.clinical'), to: '/clinical', icon: Stethoscope, color: '#16a085' },
    { name: t('nav.treatment'), to: '/treatment', icon: Clipboard, color: '#9370db' },
    { name: t('nav.analytics'), to: '/analytics', icon: LineChart, color: '#ffd700' },
    { name: t('nav.medications'), to: '/medications', icon: PillIcon, color: '#dc2626' },
    { name: t('nav.reports'), to: '/reports', icon: FileText, color: '#0284c7' },
    { name: t('nav.settings'), to: '/settings', icon: Settings, color: '#64748b' },
    { name: t('nav.support'), to: '/support', icon: HelpCircle, color: '#0ea5e9' },
  ];

  return (
    <div 
      className={`bg-gradient-to-b from-primary to-primary-800 shadow-md transition-all duration-300 relative ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-primary-700">
        <div className="flex items-center">
          <div className="text-accent relative">
            <Syringe size={32} strokeWidth={2} className="transform -rotate-45" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white">Xola</h1>
              <p className="text-xs text-accent-300">SmartCare</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-primary-700 text-primary-300"
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
                  `flex items-center p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center">
                  <item.icon 
                    size={20} 
                    strokeWidth={2}
                    style={{ color: item.color }}
                    className={collapsed ? 'mx-auto' : ''}
                  />
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