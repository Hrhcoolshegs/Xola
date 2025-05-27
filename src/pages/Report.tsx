import { useLocation, useNavigate } from 'react-router-dom';
import { TreatmentReport } from '../components/treatment/TreatmentReport';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { treatment } = location.state || {};

  if (!treatment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle size={64} className="text-yellow-500 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Report Data Not Found</h2>
          <p className="text-gray-600 mb-8">
            Unable to generate report. Please return to the Treatment page and try again.
          </p>
          <Button variant="primary" onClick={() => navigate('/treatment')}>
            Return to Treatment
          </Button>
        </div>
      </div>
    );
  }

  return <TreatmentReport treatment={treatment} />;
};

export default Report;