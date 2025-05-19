import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Plus, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, ChevronRight, FileText, Pill } from 'lucide-react';
import { clinicalData } from '../utils/sampleData';

const Treatment = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('active'); // active, completed, upcoming

  // Get treatment data from the sample data
  const treatments = clinicalData.treatments;
  
  // Mock active treatments based on sample diagnostics
  const activeTreatments = clinicalData.diagnostics.map(diagnostic => ({
    id: diagnostic.id,
    patientId: diagnostic.patientId,
    startDate: diagnostic.date,
    endDate: new Date(new Date(diagnostic.date).setMonth(new Date(diagnostic.date).getMonth() + 1)).toISOString().split('T')[0],
    status: 'active',
    progress: Math.floor(Math.random() * 100),
    procedures: diagnostic.recommendations.map(rec => ({
      name: rec.treatment,
      cost: rec.cost,
      insuranceCoverage: rec.insuranceCoverage,
      status: Math.random() > 0.5 ? 'completed' : 'pending',
      urgency: rec.urgency
    }))
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('treatment.title')}</h1>
          <p className="text-gray-500">{activeTreatments.length} active treatment plans</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<Plus size={16} />}
          >
            {t('treatment.create')}
          </Button>
        </div>
      </div>

      <div className="flex border border-gray-200 rounded-lg overflow-hidden">
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            filter === 'active' 
              ? 'bg-[#0073b9] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setFilter('active')}
        >
          {t('treatment.active')}
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            filter === 'completed' 
              ? 'bg-[#0073b9] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setFilter('completed')}
        >
          {t('treatment.completed')}
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            filter === 'upcoming' 
              ? 'bg-[#0073b9] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setFilter('upcoming')}
        >
          {t('treatment.upcoming')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTreatments.map((treatment) => {
          const totalCost = treatment.procedures.reduce((sum, proc) => sum + proc.cost, 0);
          const completedProcedures = treatment.procedures.filter(proc => proc.status === 'completed').length;
          const progress = (completedProcedures / treatment.procedures.length) * 100;

          return (
            <Card key={treatment.id}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Treatment Plan #{treatment.id}
                    </h3>
                    <p className="text-sm text-gray-500">Patient ID: {treatment.patientId}</p>
                  </div>
                  <Badge
                    variant={
                      treatment.status === 'active' ? 'primary' :
                      treatment.status === 'completed' ? 'success' : 'warning'
                    }
                  >
                    {treatment.status.charAt(0).toUpperCase() + treatment.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Calendar size={16} className="mr-1" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="font-medium">30 Days</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <DollarSign size={16} className="mr-1" />
                      <span className="text-sm">Total Cost</span>
                    </div>
                    <p className="font-medium">${totalCost}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Clock size={16} className="mr-1" />
                      <span className="text-sm">Progress</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className="h-2 bg-[#0073b9] rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <CheckCircle size={16} className="mr-1" />
                      <span className="text-sm">Procedures</span>
                    </div>
                    <p className="font-medium">{completedProcedures}/{treatment.procedures.length}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {treatment.procedures.map((procedure, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{procedure.name}</h4>
                          <div className="flex items-center mt-1">
                            <Badge
                              variant={
                                procedure.urgency === 'High' ? 'danger' :
                                procedure.urgency === 'Medium' ? 'warning' : 'info'
                              }
                              size="sm"
                              className="mr-2"
                            >
                              {procedure.urgency}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              Coverage: {procedure.insuranceCoverage}%
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={procedure.status === 'completed' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {procedure.status.charAt(0).toUpperCase() + procedure.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<FileText size={16} />}
                    >
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Pill size={16} />}
                    >
                      Medications
                    </Button>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                  >
                    Continue Treatment
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filter !== 'active' && (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle size={64} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No {filter} treatments</h3>
          <p className="text-gray-500">Switch to "Active" to view current treatment plans</p>
        </div>
      )}
    </div>
  );
};

export default Treatment;