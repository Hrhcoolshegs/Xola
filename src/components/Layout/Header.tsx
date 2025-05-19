import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, Search, User, LogOut, Menu, X } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { ProfileMenu } from '../profile/ProfileMenu';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="ml-4">
          <Breadcrumbs />
        </div>
      </div>
      
      <div className="hidden md:flex items-center relative mx-4 flex-1 max-w-lg">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder={t('common.search') + '...'}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          {language === 'en' ? 'FR' : 'EN'}
        </button>
        
        <NotificationCenter />
        
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;