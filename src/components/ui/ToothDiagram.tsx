import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { 
  Square, 
  CircleDot, 
  Crown,
  Waves,
  Trash2,
  Plus,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTreatmentStore } from '../../store/treatmentStore';
import { TreatmentType } from '../../types/treatment';

type ToothCondition = {
  type: TreatmentType;
  note?: string;
  findings?: {
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }[];
};

type ToothData = {
  number: number;
  condition?: ToothCondition;
};

const ADULT_TEETH: ToothData[] = Array.from({ length: 32 }, (_, i) => ({
  number: i + 1
}));

const QUADRANTS = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16],
  [32, 31, 30, 29, 28, 27, 26, 25],
  [24, 23, 22, 21, 20, 19, 18, 17]
];

const CONDITION_STYLES = {
  filling: {
    icon: Square,
    color: 'bg-blue-500 hover:bg-blue-600',
    label: 'Filling'
  },
  extraction: {
    icon: Trash2,
    color: 'bg-red-500 hover:bg-red-600',
    label: 'Extraction'
  },
  crown: {
    icon: Crown,
    color: 'bg-yellow-500 hover:bg-yellow-600',
    label: 'Crown'
  },
  root_canal: {
    icon: CircleDot,
    color: 'bg-purple-500 hover:bg-purple-600',
    label: 'Root Canal'
  },
  hygiene: {
    icon: Waves,
    color: 'bg-green-500 hover:bg-green-600',
    label: 'Hygiene'
  }
};

interface ToothDiagramProps {
  onConditionChange?: (toothNumber: number, condition: ToothCondition | undefined) => void;
  onAddTreatment?: (teeth: number[], type: TreatmentType) => void;
  readOnly?: boolean;
  findings?: Record<number, ToothCondition['findings']>;
}

export const ToothDiagram = ({ 
  onConditionChange, 
  onAddTreatment,
  readOnly = false,
  findings = {}
}: ToothDiagramProps) => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<TreatmentType | null>(null);
  const [teeth, setTeeth] = useState<ToothData[]>(ADULT_TEETH);
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const handleToothClick = (toothNumber: number) => {
    if (readOnly) return;

    if (selectedCondition) {
      const updatedTeeth = teeth.map(tooth => {
        if (tooth.number === toothNumber) {
          const newCondition = tooth.condition?.type === selectedCondition ? undefined : {
            type: selectedCondition
          };
          onConditionChange?.(toothNumber, newCondition);
          return { ...tooth, condition: newCondition };
        }
        return tooth;
      });
      setTeeth(updatedTeeth);
    }

    if (selectedTeeth.includes(toothNumber)) {
      setSelectedTeeth(selectedTeeth.filter(t => t !== toothNumber));
    } else {
      setSelectedTeeth([...selectedTeeth, toothNumber]);
    }
    
    setSelectedTooth(toothNumber === selectedTooth ? null : toothNumber);
  };

  const handleConditionSelect = (condition: TreatmentType) => {
    setSelectedCondition(condition === selectedCondition ? null : condition);
  };

  const handleAddTreatment = (type: TreatmentType) => {
    if (selectedTeeth.length > 0 && onAddTreatment) {
      onAddTreatment(selectedTeeth, type);
      setSelectedTeeth([]);
      setShowQuickActions(false);
    }
  };

  const renderTooth = (toothNumber: number) => {
    const tooth = teeth.find(t => t.number === toothNumber);
    const condition = tooth?.condition;
    const isSelected = selectedTooth === toothNumber || selectedTeeth.includes(toothNumber);
    const toothFindings = findings[toothNumber];
    const ConditionIcon = condition ? CONDITION_STYLES[condition.type].icon : null;

    return (
      <button
        key={toothNumber}
        onClick={() => handleToothClick(toothNumber)}
        className={`
          w-12 h-16 border-2 rounded-lg flex flex-col items-center justify-center relative
          ${isSelected ? 'border-[#0073b9]' : 'border-gray-300'}
          ${condition ? `${CONDITION_STYLES[condition.type].color} text-white` : 'bg-white hover:bg-gray-50'}
          transition-colors
        `}
      >
        <span className="text-xs font-medium mb-1">{toothNumber}</span>
        {ConditionIcon && <ConditionIcon size={16} />}
        {toothFindings && toothFindings.length > 0 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {!readOnly && (
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(CONDITION_STYLES).map(([key, value]) => {
            const Icon = value.icon;
            const isSelected = selectedCondition === key;
            return (
              <Button
                key={key}
                variant={isSelected ? 'primary' : 'outline'}
                size="sm"
                icon={<Icon size={16} />}
                onClick={() => handleConditionSelect(key as TreatmentType)}
              >
                {value.label}
              </Button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upper Teeth */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Upper Right (1-8)</h3>
          <div className="flex gap-2">
            {QUADRANTS[0].map(toothNumber => renderTooth(toothNumber))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Upper Left (9-16)</h3>
          <div className="flex gap-2">
            {QUADRANTS[1].map(toothNumber => renderTooth(toothNumber))}
          </div>
        </div>

        {/* Lower Teeth */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Lower Right (32-25)</h3>
          <div className="flex gap-2">
            {QUADRANTS[2].map(toothNumber => renderTooth(toothNumber))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Lower Left (24-17)</h3>
          <div className="flex gap-2">
            {QUADRANTS[3].map(toothNumber => renderTooth(toothNumber))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTeeth.length > 0 && !readOnly && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                {selectedTeeth.length} teeth selected
              </span>
              <Button
                variant="primary"
                size="sm"
                icon={<Plus size={16} />}
                onClick={() => setShowQuickActions(true)}
              >
                Add Treatment
              </Button>
            </div>

            {showQuickActions && (
              <div className="absolute bottom-full left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-2">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(CONDITION_STYLES).map(([key, value]) => (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      icon={<value.icon size={16} />}
                      onClick={() => handleAddTreatment(key as TreatmentType)}
                      className="justify-start"
                    >
                      {value.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedTooth && findings[selectedTooth]?.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-500 mr-2" size={20} />
              <h4 className="font-medium text-gray-800">Clinical Findings for Tooth #{selectedTooth}</h4>
            </div>
          </div>
          <div className="space-y-3">
            {findings[selectedTooth].map((finding, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  finding.severity === 'high' ? 'bg-red-50' :
                  finding.severity === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-800">{finding.type}</span>
                  <Badge
                    variant={
                      finding.severity === 'high' ? 'danger' :
                      finding.severity === 'medium' ? 'warning' : 'info'
                    }
                    size="sm"
                  >
                    {finding.severity} severity
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};