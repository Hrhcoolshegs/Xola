import { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface TreatmentStep {
  id: string;
  title: string;
  date: Date;
  duration: string;
  status: 'completed' | 'upcoming' | 'in-progress';
  provider: string;
  notes?: string;
  prerequisites?: string[];
}

interface TreatmentScheduleProps {
  steps: TreatmentStep[];
  onStepClick?: (step: TreatmentStep) => void;
}

export const TreatmentSchedule = ({ steps, onStepClick }: TreatmentScheduleProps) => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const handleStepClick = (step: TreatmentStep) => {
    setSelectedStep(selectedStep === step.id ? null : step.id);
    onStepClick?.(step);
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Treatment Schedule</h3>
          <Badge variant="primary">
            {steps.filter(s => s.status === 'completed').length}/{steps.length} Completed
          </Badge>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative pl-16 cursor-pointer transition-colors ${
                  selectedStep === step.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleStepClick(step)}
              >
                <div className={`absolute left-6 top-2 w-4 h-4 rounded-full border-2 ${
                  step.status === 'completed' ? 'bg-green-100 border-green-500' :
                  step.status === 'in-progress' ? 'bg-blue-100 border-blue-500' :
                  'bg-gray-100 border-gray-500'
                }`}>
                  {step.status === 'completed' && (
                    <CheckCircle size={12} className="text-green-500 absolute -left-px -top-px" />
                  )}
                </div>

                <div className="p-4 border rounded-lg hover:border-[#0073b9]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{step.title}</h4>
                      <div className="flex items-center mt-1 space-x-4">
                        <div className="flex items-center text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {format(step.date, 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock size={14} className="mr-1" />
                          {step.duration}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        step.status === 'completed' ? 'success' :
                        step.status === 'in-progress' ? 'primary' : 'outline'
                      }
                    >
                      {step.status}
                    </Badge>
                  </div>

                  {selectedStep === step.id && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Provider</p>
                        <p className="text-gray-600">{step.provider}</p>
                      </div>
                      {step.notes && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Notes</p>
                          <p className="text-gray-600">{step.notes}</p>
                        </div>
                      )}
                      {step.prerequisites && step.prerequisites.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Prerequisites</p>
                          <ul className="mt-1 space-y-1">
                            {step.prerequisites.map((prereq, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <AlertTriangle size={14} className="mr-1 text-yellow-500" />
                                {prereq}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};