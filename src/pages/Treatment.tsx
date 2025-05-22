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
  const [showNoteTemplate, setShowNoteTemplate] = useState(false);

  const { diagnosticData, patientId, recommendations } = location.state || {};
  const patient = patientId ? patients.find(p => p.id === patientId) : null;

  // Mock timeline data
  const timelineSteps = [
    {
      id: '1',
      date: '2023-09-15',
      title: 'Initial Consultation',
      description: 'Complete examination and treatment planning',
      status: 'completed' as const,
      images: {
        before: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=600',
        after: 'https://images.pexels.com/photos/3845548/pexels-photo-3845548.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    },
    {
      id: '2',
      date: '2023-09-22',
      title: 'First Treatment Session',
      description: 'Deep cleaning and initial procedure',
      status: 'current' as const,
      images: {
        before: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    },
    {
      id: '3',
      date: '2023-10-06',
      title: 'Follow-up Treatment',
      description: 'Review progress and continue treatment',
      status: 'upcoming' as const
    }
  ];

  // If we have diagnostic data, show the patient-specific view
  useEffect(() => {
    if (diagnosticData && patientId) {
      setView('detail');
      setSelectedTreatment({
        ...diagnosticData,
        patientId,
        recommendations
      });
    }
  }, [diagnosticData, patientId, recommendations]);

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

  const renderTreatmentDetail = () => {
    if (!selectedTreatment) return null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TreatmentTimeline
            steps={timelineSteps}
            onImageClick={handleImageClick}
          />

          <Card>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-800">Treatment Progress</h3>
                <Badge variant="primary">Active</Badge>
              </div>

              {selectedTreatment.recommendations?.map((recommendation: any, index: number) => (
                <div key={index}>
                  <div
                    className="p-4 border rounded-lg cursor-pointer hover:border-[#0073b9] transition-colors"
                    onClick={() => handleProcedureClick(recommendation.treatment)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{recommendation.treatment}</h4>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant={
                              recommendation.urgency === 'High' ? 'danger' :
                              recommendation.urgency === 'Medium' ? 'warning' : 'info'
                            }
                            size="sm"
                            className="mr-2"
                          >
                            {recommendation.urgency}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Coverage: {recommendation.insuranceCoverage}%
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="success"
                        size="sm"
                      >
                        In Progress
                      </Badge>
                    </div>
                  </div>

                  {selectedProcedure === recommendation.treatment && (
                    <div className="mt-4">
                      <TreatmentVisualizer
                        procedure={recommendation.treatment}
                        className="border rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <BeforeAfterGallery
            images={[
              {
                id: '1',
                before: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg',
                after: 'https://images.pexels.com/photos/3845548/pexels-photo-3845548.jpeg',
                date: '2023-09-15',
                procedure: 'Initial Treatment',
                notes: 'Significant improvement in gum health'
              }
            ]}
            onImageClick={handleImageClick}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-[#0073b9] rounded-full flex items-center justify-center text-white">
                <User size={32} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {patient?.name || 'Patient Name'}
                </h3>
                <p className="text-sm text-gray-500">ID: {selectedTreatment.patientId}</p>
              </div>
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

          <NoteTemplate
            templates={[
              {
                id: '1',
                title: 'Progress Note',
                content: 'Patient showing good progress with treatment...',
                type: 'progress',
                tags: ['healing', 'follow-up']
              }
            ]}
            onSelect={() => setShowNoteTemplate(true)}
          />

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Calendar size={16} />}
                  onClick={() => setShowDatePicker(true)}
                >
                  Schedule Next Visit
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<FileText size={16} />}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Pill size={16} />}
                >
                  Update Medications
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
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
              <Button variant="primary" icon={<Plus size={16} />}>
                New Treatment Plan
              </Button>
            </>
          )}
        </div>
      </div>

      {view === 'detail' ? (
        renderTreatmentDetail()
      ) : (
        <TreatmentList />
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