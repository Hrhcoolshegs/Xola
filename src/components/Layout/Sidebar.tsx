import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
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
  Tooth
} from 'lucide-react';

const Sidebar = () => {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: t('nav.dashboard'), to: '/', icon: LayoutDashboard, color: '#1e90ff' },
    { name: t('nav.patients'), to: '/patients', icon: Users, color: '#ff7f50' },
    { name: t('nav.appointments'), to: '/appointments', icon: Calendar, color: '#eab308' },
    { name: t('nav.clinical'), to: '/clinical', icon: Stethoscope, color: '#16a085' },
    { name: t('nav.treatment'), to: '/treatment', icon: Tooth, color: '#9370db' },
    { name: t('nav.analytics'), to: '/analytics', icon: LineChart, color: '#ffd700' },
    { name: t('nav.medications'), to: '/medications', icon: PillIcon, color: '#dc2626' },
    { name: t('nav.reports'), to: '/reports', icon: FileText, color: '#0284c7' },
    { name: t('nav.settings'), to: '/settings', icon: Settings, color: '#64748b' },
    { name: t('nav.support'), to: '/support', icon: HelpCircle, color: '#0ea5e9' },
  ];

  // Handle cross-module linking
  const getContextualUrl = (baseUrl: string) => {
    const params = new URLSearchParams(location.search);
    const patientId = params.get('patientId');
    const planId = params.get('planId');

    if (patientId && baseUrl === '/patients') {
      return `${baseUrl}/${patientId}`;
    }
    if (planId && baseUrl === '/treatment') {
      return `${baseUrl}/${planId}`;
    }
    return baseUrl;
  };

  return (
    <motion.div 
      className={`bg-gradient-to-b from-primary to-primary-800 shadow-md transition-all duration-300 relative h-full ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
    >
      <div className="p-4 flex items-center justify-between border-b border-primary-700">
        <div className="flex items-center">
          <div className="text-accent relative">
            <Tooth size={32} strokeWidth={2} className="transform rotate-0" />
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
                to={getContextualUrl(item.to)}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                  }`
                }
              >
                <motion.div 
                  className="flex items-center"
                  initial={false}
                  animate={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                >
                  <item.icon 
                    size={20} 
                    strokeWidth={2}
                    style={{ color: item.color }}
                  />
                  {!collapsed && (
                    <motion.span 
                      className="ml-4"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </motion.div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;