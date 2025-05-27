import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Plus,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  FileText,
  Pill,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  ArrowRight,
  User,
  Brain,
  RefreshCw
} from 'lucide-react';
import { TreatmentList } from '../components/treatment/TreatmentList';
import { TreatmentReport } from '../components/treatment/TreatmentReport';
import { TreatmentPlanEditor } from '../components/treatment/TreatmentPlanEditor';
import { BeforeAfterGallery } from '../components/treatment/BeforeAfterGallery';
import { TreatmentSchedule } from '../components/treatment/TreatmentSchedule';
import { TreatmentGuidelines } from '../components/treatment/TreatmentGuidelines';
import { RichTextEditor } from '../components/treatment/RichTextEditor';
import { useCreateTreatment } from '../services/treatmentService';

const Treatment = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const createTreatmentMutation = useCreateTreatment();

  const { diagnosticData, patientId, recommendations } = location.state || {};

  useEffect(() => {
    if (diagnosticData && patientId) {
      setView('detail');
      setSelectedTreatment({
        ...diagnosticData,
        patientId,
        recommendations,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        progress: 0,
        procedures: recommendations.map((rec: any) => ({
          ...rec,
          status: 'pending'
        }))
      });
    }
  }, [diagnosticData, patientId, recommendations]);

  const handleNewTreatment = () => {
    const newTreatment = {
      id: `T${Date.now()}`,
      patientId: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: null,
      status: 'active',
      progress: 0,
      procedures: []
    };
    setSelectedTreatment(newTreatment);
    setView('detail');
  };

  const handleTreatmentSelect = (treatment: any) => {
    setSelectedTreatment(treatment);
    setView('detail');
  };

  const handleSaveTreatment = async (treatment: any) => {
    try {
      await createTreatmentMutation.mutateAsync(treatment);
      setView('list');
      setSelectedTreatment(null);
    } catch (error) {
      console.error('Error saving treatment:', error);
    }
  };

  const handleGenerateReport = () => {
    if (selectedTreatment) {
      navigate('/report', {
        state: {
          treatment: selectedTreatment
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('treatment.title')}</h1>
          <p className="text-gray-500">
            {view === 'list' ? 'Active treatment plans' : 'Treatment details'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          {view === 'detail' ? (
            <Button
              variant="outline"
              icon={<ArrowLeft size={16} />}
              onClick={() => {
                setView('list');
                setSelectedTreatment(null);
              }}
            >
              Back to List
            </Button>
          ) : (
            <>
              <Button variant="outline" icon={<Filter size={16} />}>
                Filter
              </Button>
              <Button 
                variant="primary" 
                icon={<Plus size={16} />}
                onClick={handleNewTreatment}
              >
                New Treatment Plan
              </Button>
            </>
          )}
        </div>
      </div>

      {view === 'detail' && selectedTreatment ? (
        <TreatmentPlanEditor
          treatment={selectedTreatment}
          onSave={handleSaveTreatment}
          onGenerateReport={handleGenerateReport}
        />
      ) : (
        <TreatmentList onTreatmentSelect={handleTreatmentSelect} />
      )}
    </div>
  );
};

export default Treatment;