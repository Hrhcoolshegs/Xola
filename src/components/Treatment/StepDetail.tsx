import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, DollarSign, User, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { TreatmentStep } from '../../types/treatment';

interface StepDetailProps {
  step: TreatmentStep;
  onClose: () => void;
  onEdit?: (stepId: string) => void;
  onSchedule?: (stepId: string) => void;
}

export const StepDetail = ({ step, onClose, onEdit, onSchedule }: StepDetailProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'images' | 'notes'>('details');

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Treatment Step Details</h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'details'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'images'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'notes'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Notes
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Treatment Type</h4>
                <p className="text-gray-800">{step.type}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <Badge
                  variant={
                    step.status === 'completed'
                      ? 'success'
                      : step.status === 'in_progress'
                      ? 'warning'
                      : 'info'
                  }
                >
                  {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Teeth Involved</h4>
                <div className="flex flex-wrap gap-2">
                  {step.teeth.map((tooth) => (
                    <Badge key={tooth} variant="outline">
                      #{tooth}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Cost</h4>
                <div className="flex items-center">
                  <DollarSign className="text-gray-400 mr-1" size={16} />
                  <span className="text-gray-800">{step.estimatedCost}</span>
                </div>
              </div>

              {step.provider && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Provider</h4>
                  <div className="flex items-center">
                    <User className="text-gray-400 mr-1" size={16} />
                    <span className="text-gray-800">{step.provider}</span>
                  </div>
                </div>
              )}

              {step.scheduledDate && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Scheduled Date</h4>
                  <div className="flex items-center">
                    <Calendar className="text-gray-400 mr-1" size={16} />
                    <span className="text-gray-800">
                      {new Date(step.scheduledDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              {(step.beforeImageUrl || step.afterImageUrl) ? (
                <>
                  {step.beforeImageUrl && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Before</h4>
                      <img
                        src={step.beforeImageUrl}
                        alt="Before treatment"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                  {step.afterImageUrl && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">After</h4>
                      <img
                        src={step.afterImageUrl}
                        alt="After treatment"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              {step.notes ? (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Treatment Notes</h4>
                  <p className="text-gray-800 whitespace-pre-wrap">{step.notes}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No notes available</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                variant="outline"
                onClick={() => onEdit(step.id)}
                className="flex-1"
              >
                Edit Step
              </Button>
            )}
            {onSchedule && !step.scheduledDate && (
              <Button
                variant="primary"
                onClick={() => onSchedule(step.id)}
                className="flex-1"
              >
                Schedule
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};