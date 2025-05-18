import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const breadcrumbs = useMemo(() => {
    const pathnames = location.pathname.split('/').filter(Boolean);
    
    return [
      {
        path: '/',
        label: <Home size={16} />,
      },
      ...pathnames.map((name, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        let label = '';
        
        // Map path segments to translatable labels
        switch (name) {
          case 'dashboard':
            label = t('nav.dashboard');
            break;
          case 'patients':
            label = t('nav.patients');
            break;
          case 'appointments':
            label = t('nav.appointments');
            break;
          case 'clinical':
            label = t('nav.clinical');
            break;
          case 'analytics':
            label = t('nav.analytics');
            break;
          case 'medications':
            label = t('nav.medications');
            break;
          case 'reports':
            label = t('nav.reports');
            break;
          case 'settings':
            label = t('nav.settings');
            break;
          case 'support':
            label = t('nav.support');
            break;
          default:
            // If it's likely a patient ID or other entity ID
            if (/^[0-9a-f-]+$/.test(name)) {
              label = 'Detail';
            } else {
              label = name.charAt(0).toUpperCase() + name.slice(1);
            }
        }
        
        return { path, label };
      }),
    ];
  }, [location.pathname, t]);
  
  return (
    <nav aria-label="breadcrumb" className="flex items-center text-sm">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight size={14} className="mx-1 text-gray-400" />
            )}
            
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-gray-800">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="text-[#0073b9] hover:underline flex items-center"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};