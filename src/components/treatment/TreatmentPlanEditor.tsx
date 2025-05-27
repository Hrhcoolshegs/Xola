import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RichTextEditor } from './RichTextEditor';
import { TreatmentGuidelines } from './TreatmentGuidelines';
import { TreatmentSchedule } from './TreatmentSchedule';
import { PrognosisCard } from './PrognosisCard';
import { NoteTemplate } from './NoteTemplate';
import { BeforeAfterGallery } from './BeforeAfterGallery';
import { FileText, AlertTriangle, Clock, User, Brain, Book, Plus, Calendar, Pill } from 'lucide-react';
import { addDays } from 'date-fns';
import { patients } from '../../utils/sampleData';

interface TreatmentPlanEditorProps {
  treatment: any;
  onSave: (treatment: any) => void;
  onGenerateReport: () => void;
}

export const TreatmentPlanEditor = ({ treatment, onSave, onGenerateReport }: TreatmentPlanEditorProps) => {
  const [notes, setNotes] = useState(treatment.notes || '');
  const [selectedGuideline, setSelectedGuideline] = useState<any>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Get patient data
  const patient = patients.find(p => p.id === treatment.patientId);

  // Mock guidelines data - in production this would come from an API
  const guidelines = [
    {
      title: 'Root Canal Treatment Protocol',
      source: 'American Association of Endodontists',
      level: 'required' as const,
      description: 'Standard protocol for root canal treatment including preparation, obturation, and post-treatment care.',
      criteria: [
        'Complete removal of pulpal tissue',
        'Thorough cleaning and shaping of root canal system',
        'Adequate obturation of the prepared canals',
        'Proper coronal seal'
      ],
      contraindications: [
        'Unrestorable tooth',
        'Poor periodontal prognosis',
        'Vertical root fracture'
      ],
      evidence: [
        {
          source: 'Journal of Endodontics',
          link: 'https://example.com/joe/2024',
          year: 2024
        },
        {
          source: 'International Endodontic Journal',
          link: 'https://example.com/iej/2023',
          year: 2023
        }
      ]
    }
  ];

  // Mock schedule data - in production this would come from an API
  const scheduleSteps = [
    {
      id: '1',
      title: 'Initial Consultation',
      date: new Date(),
      duration: '60 minutes',
      status: 'completed' as const,
      provider: 'Dr. Sarah Chen',
      notes: 'Patient history reviewed, treatment options discussed'
    },
    {
      id: '2',
      title: 'First Treatment Session',
      date: addDays(new Date(), 7),
      duration: '90 minutes',
      status: 'upcoming' as const,
      provider: 'Dr. James Wilson',
      prerequisites: [
        'Complete blood work required',
        'No food 2 hours before procedure'
      ]
    },
    {
      id: '3',
      title: 'Follow-up Appointment',
      date: addDays(new Date(), 14),
      duration: '45 minutes',
      status: 'upcoming' as const,
      provider: 'Dr. Sarah Chen'
    }
  ];

  // Mock note templates
  const noteTemplates = [
    {
      id: '1',
      title: 'Progress Note',
      content: 'Patient showing good progress with treatment...',
      type: 'progress' as const,
      tags: ['healing', 'follow-up']
    }
  ];

  const handleSave = () => {
    onSave({
      ...treatment,
      notes
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Treatment Details</h3>
                <p className="text-gray-500">Edit treatment plan and add notes</p>
              </div>
              <Badge variant={treatment.status === 'active' ? 'primary' : 'outline'}>
                {treatment.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinical Notes
                </label>
                <RichTextEditor
                  content={notes}
                  onChange={setNotes}
                  placeholder="Add detailed notes about the treatment plan..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  icon={<FileText size={16} />}
                  onClick={onGenerateReport}
                >
                  Generate Report
                </Button>
                <Button
                  variant="primary"
                  icon={<Plus size={16} />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <TreatmentSchedule
          steps={scheduleSteps}
          onStepClick={(step) => console.log('Step clicked:', step)}
        />

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
          onImageClick={(image) => console.log('Image clicked:', image)}
        />
      </div>

      <div className="space-y-6">
        {/* Patient Details */}
        <Card>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-[#0073b9] rounded-full flex items-center justify-center text-white">
              <User size={32} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                {patient?.name || 'Patient Name'}
              </h3>
              <p className="text-sm text-gray-500">ID: {treatment.patientId}</p>
            </div>
          </div>
        </Card>

        {/* Treatment Prognosis */}
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

        {/* Note Templates */}
        <NoteTemplate
          templates={noteTemplates}
          onSelect={(template) => setNotes(template.content)}
        />

        {/* Quick Actions */}
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
                onClick={onGenerateReport}
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

        <TreatmentGuidelines
          guidelines={guidelines}
          onGuidelineSelect={setSelectedGuideline}
        />

        {selectedGuideline && (
          <Card>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <div className="flex items-start">
                <AlertTriangle className="text-blue-500 mt-0.5 mr-2\" size={16} />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Guideline Selected</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Please ensure your treatment plan aligns with the selected guidelines before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};