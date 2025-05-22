import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TreatmentVisualizer } from '../components/treatment/TreatmentVisualizer';
import { TreatmentStepDetails } from '../components/treatment/TreatmentStepDetails';
import { TreatmentTimeline } from '../components/treatment/TreatmentTimeline';
import { TreatmentReport } from '../components/treatment/TreatmentReport';
import { TreatmentStatusUpdates } from '../components/treatment/TreatmentStatusUpdates';
import { PrognosisCard } from '../components/treatment/PrognosisCard';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';

const Treatment = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { diagnosticData, uploadedImages } = location.state || {};

  const [currentStep, setCurrentStep] = useState(0);

  const treatmentSteps = [
    {
      id: 'step1',
      date: '2023-09-15',
      title: 'Initial Assessment',
      description: 'Complete examination and treatment planning',
      status: 'completed',
      images: {
        before: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg',
        after: 'https://images.pexels.com/photos/3845548/pexels-photo-3845548.jpeg'
      }
    },
    {
      id: 'step2',
      date: '2023-09-22',
      title: 'Cavity Treatment',
      description: 'Composite filling for tooth #29',
      status: 'current',
      images: {
        before: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg'
      }
    },
    {
      id: 'step3',
      date: '2023-10-06',
      title: 'Professional Cleaning',
      description: 'Deep cleaning and fluoride treatment',
      status: 'upcoming'
    }
  ];

  const mockPrognosis = {
    successRate: 92,
    factors: {
      positive: [
        'Early detection',
        'Good oral hygiene',
        'Regular dental visits'
      ],
      negative: [
        'Moderate cavity depth',
        'Slight gum inflammation'
      ]
    },
    timeline: [
      {
        phase: 'Treatment',
        duration: '2-3 weeks',
        milestones: [
          'Complete cavity filling',
          'Monitor for sensitivity',
          'Adjust if needed'
        ]
      },
      {
        phase: 'Recovery',
        duration: '1-2 weeks',
        milestones: [
          'Normal diet resumed',
          'Regular brushing routine',
          'Follow-up check'
        ]
      }
    ],
    recommendations: [
      {
        priority: 'high',
        action: 'Complete treatment within 2 weeks',
        rationale: 'Prevent further decay progression'
      },
      {
        priority: 'medium',
        action: 'Maintain strict oral hygiene',
        rationale: 'Essential for treatment success'
      },
      {
        priority: 'low',
        action: 'Consider fluoride supplements',
        rationale: 'Additional protection against decay'
      }
    ]
  };

  const statusUpdates = [
    {
      id: 'update1',
      type: 'progress',
      title: 'Treatment Started',
      message: 'Initial assessment completed successfully',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 'update2',
      type: 'milestone',
      title: 'X-Ray Analysis Complete',
      message: 'Results reviewed and treatment plan updated',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 'update3',
      type: 'alert',
      title: 'Appointment Reminder',
      message: 'Next treatment session scheduled for tomorrow',
      timestamp: '2 days ago',
      read: false,
      action: {
        label: 'View Schedule',
        onClick: () => navigate('/appointments')
      }
    }
  ];

  const mockTreatment = {
    id: 'T123',
    patientId: 'P001',
    startDate: '2023-09-15',
    procedures: [
      {
        name: 'Composite Filling',
        status: 'in_progress',
        notes: ['Cavity on tooth #29', 'Local anesthetic administered'],
        cost: 250,
        insuranceCoverage: 80
      },
      {
        name: 'Professional Cleaning',
        status: 'pending',
        cost: 120,
        insuranceCoverage: 100
      }
    ],
    notes: [
      {
        date: '2023-09-15',
        author: 'Dr. Sarah Chen',
        content: 'Patient reported mild sensitivity to cold. Treatment plan discussed and agreed upon.',
        type: 'observation'
      },
      {
        date: '2023-09-15',
        author: 'Dr. Sarah Chen',
        content: 'Local anesthetic administered without complications. Patient tolerating procedure well.',
        type: 'progress'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('treatment.title')}</h1>
            <p className="text-gray-500">Treatment Plan #T123 - Emma Thompson</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            icon={<Calendar size={16} />}
          >
            Schedule
          </Button>
          <Button
            variant="primary"
            icon={<FileText size={16} />}
          >
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <TreatmentVisualizer
            modelUrl="https://example.com/3d-model.glb"
            procedure="Composite Filling"
          />

          <TreatmentTimeline
            steps={treatmentSteps}
            onImageClick={(image) => {
              // Handle image click
            }}
          />

          <TreatmentStepDetails
            step={{
              id: 'step2',
              title: 'Cavity Treatment',
              description: 'Treatment of dental caries on tooth #29 using composite filling material.',
              status: 'in_progress',
              duration: '45 minutes',
              provider: 'Dr. Sarah Chen',
              date: '2023-09-22',
              precautions: [
                'Avoid eating until numbness subsides',
                'Careful brushing around treated area',
                'Report any persistent sensitivity'
              ],
              aftercare: [
                'Wait at least 2 hours before eating',
                'Avoid very hot or cold foods for 24 hours',
                'Continue regular oral hygiene routine'
              ],
              notes: [
                'Patient reported mild sensitivity',
                'Local anesthetic administered at 2:15 PM',
                'Procedure completed without complications'
              ]
            }}
            onStatusUpdate={(stepId, status) => {
              // Handle status update
            }}
            onAddNote={(stepId, note) => {
              // Handle note addition
            }}
          />
        </div>

        <div className="space-y-6">
          <TreatmentStatusUpdates
            treatmentId="T123"
            updates={statusUpdates}
            onUpdateRead={(id) => {
              // Handle update read
            }}
            onRefresh={() => {
              // Handle refresh
            }}
          />

          <PrognosisCard prognosis={mockPrognosis} />

          <TreatmentReport
            treatment={mockTreatment}
            onPrint={() => {
              // Handle print
            }}
            onDownload={() => {
              // Handle download
            }}
            onShare={() => {
              // Handle share
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Treatment;