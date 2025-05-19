import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { TreatmentStep } from '../../types/treatment';

interface TimelineEvent {
  date: string;
  stepId: string;
  status: 'completed' | 'upcoming';
}

interface TreatmentTimelineProps {
  steps: TreatmentStep[];
  onStepClick?: (stepId: string) => void;
}

export const TreatmentTimeline = ({ steps, onStepClick }: TreatmentTimelineProps) => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const handleStepClick = (stepId: string) => {
    setSelectedStep(stepId);
    onStepClick?.(stepId);
  };

  const getStatusColor = (status: TreatmentStep['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'planned':
        return 'info';
      default:
        return 'danger';
    }
  };

  const getStatusIcon = (status: TreatmentStep['status']) => {
    switch (status) {
      case 'completed':
        return <Check size={16} />;
      case 'in_progress':
        return <Clock size={16} />;
      case 'planned':
        return <Calendar size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Treatment Timeline</h3>
      </div>

      <div className="p-4">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Timeline events */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative pl-10 ${
                  selectedStep === step.id ? 'bg-gray-50 -mx-4 px-4 py-3 rounded-lg' : ''
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                    step.status === 'completed'
                      ? 'bg-green-500 border-green-500'
                      : step.status === 'in_progress'
                      ? 'bg-yellow-500 border-yellow-500'
                      : 'bg-white border-gray-300'
                  }`}
                  style={{ transform: 'translateX(-50%)', top: '24px' }}
                />

                <div
                  className="cursor-pointer"
                  onClick={() => handleStepClick(step.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(step.status)} size="sm">
                        <span className="flex items-center">
                          {getStatusIcon(step.status)}
                          <span className="ml-1">
                            {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                          </span>
                        </span>
                      </Badge>
                      {step.scheduledDate && (
                        <span className="text-sm text-gray-500">
                          {new Date(step.scheduledDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">Step {index + 1}</span>
                  </div>

                  <h4 className="font-medium text-gray-800 mt-1">{step.type}</h4>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>

                  {selectedStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-3"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Estimated Cost:</span>
                        <span className="font-medium">${step.estimatedCost}</span>
                      </div>
                      {step.provider && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Provider:</span>
                          <span className="font-medium">{step.provider}</span>
                        </div>
                      )}
                      {step.notes && (
                        <div className="text-sm">
                          <span className="text-gray-500">Notes:</span>
                          <p className="mt-1 text-gray-600">{step.notes}</p>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {!step.completedDate && (
                          <Button variant="primary" size="sm">
                            Schedule
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};