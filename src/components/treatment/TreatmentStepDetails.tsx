import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, Clock, User, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface TreatmentStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  duration: string;
  provider: string;
  date?: string;
  notes?: string[];
  precautions?: string[];
  aftercare?: string[];
  images?: {
    before?: string;
    after?: string;
  };
}

interface TreatmentStepDetailsProps {
  step: TreatmentStep;
  onStatusUpdate: (stepId: string, status: TreatmentStep['status']) => void;
  onAddNote: (stepId: string, note: string) => void;
}

export const TreatmentStepDetails = ({
  step,
  onStatusUpdate,
  onAddNote
}: TreatmentStepDetailsProps) => {
  const [newNote, setNewNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(step.id, newNote);
      setNewNote('');
      setShowNoteInput(false);
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-800">{step.title}</h3>
            <Badge
              variant={
                step.status === 'completed' ? 'success' :
                step.status === 'in_progress' ? 'primary' : 'outline'
              }
              className="mt-2"
            >
              {step.status.replace('_', ' ').charAt(0).toUpperCase() + 
               step.status.slice(1).replace('_', ' ')}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusUpdate(step.id, 'completed')}
              icon={<CheckCircle size={16} />}
              disabled={step.status === 'completed'}
            >
              Mark Complete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-700 mb-2">
              <Clock size={16} className="mr-2" />
              <span className="font-medium">Duration</span>
            </div>
            <p className="text-gray-600">{step.duration}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-700 mb-2">
              <User size={16} className="mr-2" />
              <span className="font-medium">Provider</span>
            </div>
            <p className="text-gray-600">{step.provider}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-700 mb-2">
              <FileText size={16} className="mr-2" />
              <span className="font-medium">Status</span>
            </div>
            <p className="text-gray-600">{step.status.replace('_', ' ')}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-3">Description</h4>
          <p className="text-gray-600">{step.description}</p>
        </div>

        {step.precautions && step.precautions.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <AlertTriangle className="text-yellow-400 mr-3" size={20} />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Precautions</h4>
                <ul className="mt-2 space-y-1">
                  {step.precautions.map((precaution, index) => (
                    <li key={index} className="text-sm text-yellow-700">
                      • {precaution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {step.aftercare && step.aftercare.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Aftercare Instructions</h4>
            <ul className="space-y-2">
              {step.aftercare.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight size={16} className="text-[#0073b9] mt-1 mr-2" />
                  <span className="text-gray-600">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Notes</h4>
            <Button
              variant="outline"
              size="sm"
              icon={<FileText size={16} />}
              onClick={() => setShowNoteInput(!showNoteInput)}
            >
              Add Note
            </Button>
          </div>

          <AnimatePresence>
            {showNoteInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                  placeholder="Enter note..."
                  rows={3}
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNoteInput(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                  >
                    Add Note
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {step.notes?.map((note, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};