import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, Activity, Calendar, DollarSign } from 'lucide-react';
import { useTreatmentStore } from '../../store/treatmentStore';
import { treatmentService } from '../../services/treatmentService';
import { TreatmentVisualizer } from '../../components/Treatment/TreatmentVisualizer';

const sampleSteps = [
  {
    id: '1',
    title: 'Initial Examination',
    description: 'Comprehensive dental examination and X-rays',
    imageUrl: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '30 mins'
  },
  {
    id: '2',
    title: 'Cleaning & Preparation',
    description: 'Professional cleaning and cavity preparation',
    imageUrl: 'https://images.pexels.com/photos/3845548/pexels-photo-3845548.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '45 mins'
  },
  {
    id: '3',
    title: 'Filling Placement',
    description: 'Composite filling placement and curing',
    imageUrl: 'https://images.pexels.com/photos/3845729/pexels-photo-3845729.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '1 hour'
  }
];

const TreatmentDashboard = () => {
  const { isLoading, setLoading, setError } = useTreatmentStore();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        await treatmentService.getPlans();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [setLoading, setError]);

  if (isLoading) {
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
          <h1 className="text-2xl font-bold text-gray-800">Treatment Dashboard</h1>
          <p className="text-gray-500">Manage and monitor treatment plans</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/treatment/new">
            <Button variant="primary" icon={<Plus size={16} />}>
              New Treatment Plan
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Active Plans</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">12</p>
              <p className="text-sm text-gray-500 mt-1">3 pending approval</p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Activity size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Upcoming Procedures</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">8</p>
              <p className="text-sm text-gray-500 mt-1">Next 7 days</p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Calendar size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Revenue Pipeline</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">$24,500</p>
              <p className="text-sm text-gray-500 mt-1">From active plans</p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <DollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TreatmentVisualizer steps={sampleSteps} />

        <Card title="Recent Treatment Plans">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Plan Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Progress</th>
                  <th className="px-4 py-3">Next Step</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">Emma Thompson</td>
                  <td className="px-4 py-3">Full Restoration</td>
                  <td className="px-4 py-3">
                    <Badge variant="success">Active</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </td>
                  <td className="px-4 py-3">Crown Fitting</td>
                  <td className="px-4 py-3">
                    <Link to="/treatment/1" className="text-primary hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TreatmentDashboard;