import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Plus, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, ChevronRight, FileText, Pill, Search, Filter, Eye, Edit, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { clinicalData } from '../utils/sampleData';
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

  const filteredTreatments = activeTreatments.filter(treatment => {
    const matchesSearch = treatment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || treatment.status === filter;
    const matchesDate = dateRange === 'all' || true; // Implement date filtering logic
    return matchesSearch && matchesFilter && matchesDate;
  });

  return (
    <div className="space-y-6">
      {view === 'list' ? (
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
                          {treatment.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                          <p className="font-medium">
                            ${treatment.procedures.reduce((sum, proc) => sum + proc.cost, 0)}
                          </p>
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
                                style={{ width: `${treatment.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">
                              {Math.round(treatment.progress)}%
                            </span>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center text-gray-500 mb-1">
                            <CheckCircle size={16} className="mr-1" />
                            <span className="text-sm">Procedures</span>
                          </div>
                          <p className="font-medium">
                            {treatment.procedures.filter(p => p.status === 'completed').length}/
                            {treatment.procedures.length}
                          </p>
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
      ) : (
        <>
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              icon={<ArrowLeft size={16} />}
              onClick={() => setView('list')}
              className="mr-4"
            >
              Back to List
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Treatment Plan #{selectedTreatment?.id}
              </h1>
              <p className="text-gray-500">Patient ID: {selectedTreatment?.patientId}</p>
            </div>
          </div>

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
                    <Badge
                      variant={selectedTreatment?.status === 'active' ? 'primary' : 'success'}
                    >
                      {selectedTreatment?.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Completion</h4>
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-2 bg-[#0073b9] rounded-full"
                            style={{ width: `${selectedTreatment?.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round(selectedTreatment?.progress)}%
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Time Remaining</h4>
                      <p className="font-medium">14 days</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Next Visit</h4>
                      <p className="font-medium">Sep 22, 2023</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedTreatment?.procedures.map((procedure: any, index: number) => (
                      <div key={index}>
                        <div
                          className="p-4 border rounded-lg cursor-pointer hover:border-[#0073b9] transition-colors"
                          onClick={() => handleProcedureClick(procedure.name)}
                        >
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
                              {procedure.status}
                            </Badge>
                          </div>
                        </div>

                        {selectedProcedure === procedure.name && (
                          <div className="mt-4">
                            <TreatmentVisualizer
                              procedure={procedure.name}
                              className="border rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
              />
            </div>

            <div className="space-y-6">
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
                onSelect={() => {}}
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