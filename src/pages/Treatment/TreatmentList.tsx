import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, FileText, Calendar, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';
import { TreatmentPlan } from '../../types/treatment';
import { treatmentService } from '../../services/treatmentService';

const TreatmentList = () => {
  const { t } = useLanguage();
  const [plans, setPlans] = useState<TreatmentPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await treatmentService.getPlans();
        setPlans(data);
      } catch (error) {
        console.error('Failed to load treatment plans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  const getStatusColor = (status: TreatmentPlan['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'danger';
      default:
        return 'warning';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('treatment.title')}</h1>
          <p className="text-gray-500">{t('treatment.subtitle')}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/treatment/new">
            <Button variant="primary" icon={<Plus size={16} />}>
              {t('treatment.new')}
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">{t('treatment.patient')}</th>
                <th className="px-4 py-3">{t('treatment.title')}</th>
                <th className="px-4 py-3">{t('treatment.steps')}</th>
                <th className="px-4 py-3">{t('treatment.cost')}</th>
                <th className="px-4 py-3">{t('treatment.status')}</th>
                <th className="px-4 py-3">{t('treatment.created')}</th>
                <th className="px-4 py-3">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    <Link to={`/patients/${plan.patientId}`} className="text-primary hover:underline">
                      {plan.patientId}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{plan.title}</td>
                  <td className="px-4 py-3">{plan.steps.length} steps</td>
                  <td className="px-4 py-3">
                    ${plan.estimatedCost.toLocaleString()}
                    <span className="text-xs text-gray-500 ml-1">
                      ({plan.insuranceCoverage}% covered)
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusColor(plan.status)}>
                      {t(`treatment.status.${plan.status}`)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Link 
                        to={`/treatment/${plan.id}`}
                        className="p-1 text-primary hover:bg-primary/10 rounded"
                        title={t('common.view')}
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        to={`/treatment/${plan.id}/edit`}
                        className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                        title={t('common.edit')}
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => {/* Implement delete */}}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title={t('common.delete')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Active Plans</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">
                {plans.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <FileText size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Scheduled Steps</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">
                {plans.reduce((acc, plan) => 
                  acc + plan.steps.filter(s => s.scheduledDate && !s.completedDate).length, 0
                )}
              </p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Calendar size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Total Revenue</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">
                ${plans.reduce((acc, plan) => acc + plan.estimatedCost, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <DollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TreatmentList;