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
  User
} from 'lucide-react';
import { clinicalData, patients } from '../utils/sampleData';
import { TreatmentVisualizer } from '../components/treatment/TreatmentVisualizer';
import { TreatmentTimeline } from '../components/treatment/TreatmentTimeline';
import { ImageGallery } from '../components/treatment/ImageGallery';
import { DatePickerModal } from '../components/treatment/DatePickerModal';
import { TreatmentList } from '../components/treatment/TreatmentList';
import { TreatmentReport } from '../components/treatment/TreatmentReport';
import { TreatmentStepDetails } from '../components/treatment/TreatmentStepDetails';
import { PrognosisCard } from '../components/treatment/PrognosisCard';
import { BeforeAfterGallery } from '../components/treatment/BeforeAfterGallery';
import { NoteTemplate } from '../components/treatment/NoteTemplate';

const Treatment = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  const { diagnosticData, patientId, recommendations } = location.state || {};
  const patient = patientId ? patients.find(p => p.id === patientId) : null;

  // If we have diagnostic data, show the patient-specific view
  useEffect(() => {
    if (diagnosticData && patientId) {
      setView('detail');
    }
  }, [diagnosticData, patientId]);

  const handleProcedureClick = (procedureName: string) => {
    setSelectedProcedure(selectedProcedure === procedureName ? null : procedureName);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowGallery(true);
  };

  const handleScheduleAppointment = (date: Date, time: string) => {
    console.log('Scheduling appointment for:', date, time);
    setShowDatePicker(false);
  };

  const handleTreatmentSelect = (treatment: any) => {
    setSelectedTreatment(treatment);
    setView('detail');
  };

  const filteredTreatments = clinicalData.treatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || true; // Implement proper filtering
    const matchesDate = dateRange === 'all' || true; // Implement proper date filtering
    return matchesSearch && matchesFilter && matchesDate;
  });

  const renderPatientSpecificView = () => {
    if (!diagnosticData || !patientId || !patient) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-[#0073b9] rounded-full flex items-center justify-center text-white">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
              <p className="text-gray-500">Patient ID: {patient.id}</p>
            </div>
          </div>
          <Button
            variant="outline"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('/clinical')}
          >
            Back to Clinical
          </Button>
        </div>

        <Card title="Recommended Treatments">
          <div className="space-y-6">
            {recommendations.map((recommendation: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg hover:border-[#0073b9] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{recommendation.treatment}</h3>
                    <div className="flex items-center mt-2">
                      <Badge
                        variant={
                          recommendation.urgency === 'High' ? 'danger' :
                          recommendation.urgency === 'Medium' ? 'warning' : 'info'
                        }
                        size="sm"
                        className="mr-2"
                      >
                        {recommendation.urgency} Urgency
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Insurance Coverage: {recommendation.insuranceCoverage}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-[#0073b9]">
                      ${recommendation.cost}
                    </p>
                    <p className="text-xs text-gray-500">
                      Est. out-of-pocket: ${(recommendation.cost * (1 - recommendation.insuranceCoverage / 100)).toFixed(2)}
                    </p>
                  </div>
                </div>

                {recommendation.medication !== 'None' && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Pill size={16} className="text-[#0073b9] mr-2" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Recommended Medication
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {recommendation.medication}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Calendar size={16} />}
                    onClick={() => setShowDatePicker(true)}
                  >
                    Schedule
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<CheckCircle size={16} />}
                    onClick={() => handleTreatmentSelect(recommendation)}
                  >
                    Start Treatment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <PrognosisCard
          prognosis={{
            successRate: 85,
            factors: {
              positive: [
                'Early detection',
                'Patient compliance',
                'Good oral hygiene'
              ],
              negative: [
                'Complex case',
                'Multiple procedures needed'
              ]
            },
            timeline: [
              {
                phase: 'Initial Treatment',
                duration: '2-3 weeks',
                milestones: [
                  'Complete deep cleaning',
                  'Assess healing response',
                  'Adjust treatment plan if needed'
                ]
              }
            ],
            recommendations: [
              {
                priority: 'high',
                action: 'Maintain oral hygiene',
                rationale: 'Critical for treatment success'
              }
            ]
          }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {diagnosticData && patientId ? (
        renderPatientSpecificView()
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('treatment.title')}</h1>
              <p className="text-gray-500">{filteredTreatments.length} active treatment plans</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" icon={<Filter size={16} />}>
                Filter
              </Button>
              <Button variant="primary" icon={<Plus size={16} />}>
                New Treatment Plan
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-64">
              <Card>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search treatments..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Date Range</label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex-1">
              <div className="grid gap-4">
                {filteredTreatments.map((treatment) => (
                  <Card key={treatment.id}>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {treatment.name}
                          </h3>
                          <p className="text-sm text-gray-500">{treatment.category}</p>
                        </div>
                        <Badge variant="primary">
                          Active
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center text-gray-500 mb-1">
                            <Calendar size={16} className="mr-1" />
                            <span className="text-sm">Duration</span>
                          </div>
                          <p className="font-medium">{treatment.duration}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center text-gray-500 mb-1">
                            <DollarSign size={16} className="mr-1" />
                            <span className="text-sm">Cost</span>
                          </div>
                          <p className="font-medium">${treatment.averageCost}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center text-gray-500 mb-1">
                            <Clock size={16} className="mr-1" />
                            <span className="text-sm">Recovery</span>
                          </div>
                          <p className="font-medium">{treatment.recoveryTime}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center text-gray-500 mb-1">
                            <CheckCircle size={16} className="mr-1" />
                            <span className="text-sm">Coverage</span>
                          </div>
                          <p className="font-medium">{treatment.insuranceCoverage}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<Eye size={16} />}
                              onClick={() => handleTreatmentSelect(treatment)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<Edit size={16} />}
                            >
                              Edit
                            </Button>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<Calendar size={16} />}
                            onClick={() => setShowDatePicker(true)}
                          >
                            Schedule Next Visit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {showGallery && selectedImage && (
        <ImageGallery
          images={[selectedImage]}
          onClose={() => {
            setShowGallery(false);
            setSelectedImage(null);
          }}
        />
      )}

      <DatePickerModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onConfirm={handleScheduleAppointment}
        title="Schedule Next Appointment"
      />
    </div>
  );
};

export default Treatment;