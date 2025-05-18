import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <Breadcrumbs />
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
        
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#ff9e1b] border-2 border-white"></span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 rounded-full hover:bg-gray-100 p-1 pl-2 transition-colors"
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-800">Dr. Sarah Chen</p>
              <p className="text-xs text-gray-500">Dentist</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#0073b9] flex items-center justify-center text-white overflow-hidden">
              <User size={20} />
            </div>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
              <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <div className="border-t border-gray-200"></div>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                  <LogOut size={16} className="mr-2" />
                  {t('nav.logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;