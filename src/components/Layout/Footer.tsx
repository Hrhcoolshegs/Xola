import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-6 text-center text-sm text-gray-600">
      <div className="flex justify-between items-center">
        <div>
          <span>{t('footer.copyright')}</span>
        </div>
        <div>
          <a 
            href="https://optimusai.ai/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#0073b9] hover:underline"
          >
            {t('footer.powered')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;