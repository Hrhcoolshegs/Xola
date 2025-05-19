import { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AlertTriangle, Check, Plus, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToothData {
  id: string;
  condition?: string;
  treatment?: string;
  status: 'healthy' | 'attention' | 'treated';
  notes?: string;
  findings?: {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }[];
}

interface ToothDiagramProps {
  data: ToothData[];
  onToothSelect: (toothId: string) => void;
  onQuickAction?: (toothId: string, action: string) => void;
  highlightedTeeth?: string[];
}

export const ToothDiagram = ({ 
  data, 
  onToothSelect, 
  onQuickAction,
  highlightedTeeth = []
}: ToothDiagramProps) => {
  const [selectedTooth, setSelectedTooth] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const handleToothClick = (toothId: string) => {
    setSelectedTooth(toothId === selectedTooth ? null : toothId);
    setShowQuickActions(toothId !== selectedTooth);
    onToothSelect(toothId);
  };

  const getToothColor = (status: ToothData['status'], isHighlighted: boolean) => {
    if (isHighlighted) {
      return 'fill-yellow-200 stroke-yellow-500 animate-pulse';
    }
    switch (status) {
      case 'healthy':
        return 'fill-white stroke-gray-400';
      case 'attention':
        return 'fill-yellow-100 stroke-yellow-500';
      case 'treated':
        return 'fill-green-100 stroke-green-500';
      default:
        return 'fill-white stroke-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800">Dental Chart</h3>
          <p className="text-sm text-gray-500">Click on a tooth to view details</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-400 mr-1"></div>
            <span className="text-xs text-gray-500">Healthy</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-100 border-2 border-yellow-500 mr-1"></div>
            <span className="text-xs text-gray-500">Needs Attention</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-100 border-2 border-green-500 mr-1"></div>
            <span className="text-xs text-gray-500">Treated</span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[2/1]">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
        >
          {/* Upper Teeth */}
          {Array.from({ length: 16 }, (_, i) => {
            const toothId = `${18 - i}`;
            const tooth = data.find(t => t.id === toothId) || { status: 'healthy' };
            const isHighlighted = highlightedTeeth.includes(toothId);
            const x = 50 + (i * 45);
            return (
              <g key={`upper-${toothId}`} onClick={() => handleToothClick(toothId)}>
                <path
                  d={`M ${x} 100 L ${x + 30} 100 L ${x + 25} 150 L ${x + 5} 150 Z`}
                  className={`${getToothColor(tooth.status, isHighlighted)} cursor-pointer transition-colors`}
                  strokeWidth="2"
                />
                <text
                  x={x + 15}
                  y={85}
                  className="text-xs fill-gray-500 text-center"
                  textAnchor="middle"
                >
                  {toothId}
                </text>
              </g>
            );
          })}

          {/* Lower Teeth */}
          {Array.from({ length: 16 }, (_, i) => {
            const toothId = `${31 - i}`;
            const tooth = data.find(t => t.id === toothId) || { status: 'healthy' };
            const isHighlighted = highlightedTeeth.includes(toothId);
            const x = 50 + (i * 45);
            return (
              <g key={`lower-${toothId}`} onClick={() => handleToothClick(toothId)}>
                <path
                  d={`M ${x} 250 L ${x + 30} 250 L ${x + 25} 300 L ${x + 5} 300 Z`}
                  className={`${getToothColor(tooth.status, isHighlighted)} cursor-pointer transition-colors`}
                  strokeWidth="2"
                />
                <text
                  x={x + 15}
                  y={320}
                  className="text-xs fill-gray-500 text-center"
                  textAnchor="middle"
                >
                  {toothId}
                </text>
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {selectedTooth && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">Tooth #{selectedTooth}</h4>
                  <div className="flex items-center mt-1">
                    {data.find(t => t.id === selectedTooth)?.condition && (
                      <Badge
                        variant="warning"
                        size="sm"
                        className="mr-2"
                      >
                        {data.find(t => t.id === selectedTooth)?.condition}
                      </Badge>
                    )}
                    {data.find(t => t.id === selectedTooth)?.treatment && (
                      <Badge
                        variant="success"
                        size="sm"
                      >
                        {data.find(t => t.id === selectedTooth)?.treatment}
                      </Badge>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTooth(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <AlertTriangle size={16} />
                </button>
              </div>

              {data.find(t => t.id === selectedTooth)?.findings && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Findings</h5>
                  <div className="space-y-2">
                    {data.find(t => t.id === selectedTooth)?.findings?.map((finding, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-700">{finding.type}</span>
                          <Badge
                            variant={
                              finding.severity === 'high' ? 'danger' :
                              finding.severity === 'medium' ? 'warning' : 'info'
                            }
                            size="sm"
                          >
                            {finding.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.find(t => t.id === selectedTooth)?.notes && (
                <p className="mt-2 text-sm text-gray-600">
                  {data.find(t => t.id === selectedTooth)?.notes}
                </p>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Plus size={16} />}
                  onClick={() => onQuickAction?.(selectedTooth, 'add-treatment')}
                >
                  Add Treatment
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Check size={16} />}
                  onClick={() => onQuickAction?.(selectedTooth, 'mark-complete')}
                >
                  Mark Complete
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};