import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { 
  Square, 
  CircleDot, 
  Crown, 
  Waves,
  Trash2
} from 'lucide-react';

type ToothCondition = {
  type: 'filling' | 'extraction' | 'crown' | 'rootcanal' | 'hygiene';
  note?: string;
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
  rootcanal: {
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
}

export const ToothDiagram = ({ onConditionChange }: ToothDiagramProps) => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<ToothCondition['type'] | null>(null);
  const [teeth, setTeeth] = useState<ToothData[]>(ADULT_TEETH);

  const handleToothClick = (toothNumber: number) => {
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
    setSelectedTooth(toothNumber === selectedTooth ? null : toothNumber);
  };

  const handleConditionSelect = (condition: ToothCondition['type']) => {
    setSelectedCondition(condition === selectedCondition ? null : condition);
  };

  const renderTooth = (toothNumber: number) => {
    const tooth = teeth.find(t => t.number === toothNumber);
    const condition = tooth?.condition;
    const isSelected = selectedTooth === toothNumber;
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
      </button>
    );
  };

  return (
    <div className="space-y-6">
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
              onClick={() => handleConditionSelect(key as ToothCondition['type'])}
            >
              {value.label}
            </Button>
          );
        })}
      </div>

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

      {selectedTooth && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Tooth #{selectedTooth}</h4>
              <p className="text-sm text-gray-500">
                {teeth.find(t => t.number === selectedTooth)?.condition
                  ? `Current Treatment: ${CONDITION_STYLES[teeth.find(t => t.number === selectedTooth)?.condition?.type || 'filling'].label}`
                  : 'No treatment selected'}
              </p>
            </div>
            {teeth.find(t => t.number === selectedTooth)?.condition && (
              <Badge variant="danger" size="sm">Requires Treatment</Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};