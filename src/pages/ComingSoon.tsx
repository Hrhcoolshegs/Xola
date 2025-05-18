import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/Button';
import { Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <Clock size={80} className="text-[#0073b9] mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title} - {t('comingsoon.title')}</h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        {t('comingsoon.message')}
      </p>
      <Link to="/">
        <Button 
          variant="primary"
          icon={<ArrowLeft size={16} />}
        >
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default ComingSoon;