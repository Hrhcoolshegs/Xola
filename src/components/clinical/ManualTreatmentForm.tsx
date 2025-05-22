import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Plus, Trash2, AlertTriangle, Pill } from 'lucide-react';

interface Procedure {
  treatment: string;
  urgency: 'High' | 'Medium' | 'Low';
  cost: number;
  insuranceCoverage: number;
  medication?: string;
  notes?: string;
}

interface ManualTreatmentFormProps {
  onSubmit: (procedures: Procedure[]) => void;
}

export const ManualTreatmentForm = ({ onSubmit }: ManualTreatmentFormProps) => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [currentProcedure, setCurrentProcedure] = useState<Procedure>({
    treatment: '',
    urgency: 'Medium',
    cost: 0,
    insuranceCoverage: 70,
  });

  const handleAddProcedure = () => {
    if (currentProcedure.treatment.trim()) {
      setProcedures([...procedures, currentProcedure]);
      setCurrentProcedure({
        treatment: '',
        urgency: 'Medium',
        cost: 0,
        insuranceCoverage: 70,
      });
    }
  };

  const handleRemoveProcedure = (index: number) => {
    setProcedures(procedures.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (procedures.length > 0) {
      onSubmit(procedures);
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Create Treatment Plan</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Treatment Name
                </label>
                <input
                  type="text"
                  value={currentProcedure.treatment}
                  onChange={(e) => setCurrentProcedure({ ...currentProcedure, treatment: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                  placeholder="Enter treatment name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency
                </label>
                <select
                  value={currentProcedure.urgency}
                  onChange={(e) => setCurrentProcedure({ ...currentProcedure, urgency: e.target.value as 'High' | 'Medium' | 'Low' })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost ($)
                </label>
                <input
                  type="number"
                  value={currentProcedure.cost}
                  onChange={(e) => setCurrentProcedure({ ...currentProcedure, cost: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                  min="0"
                  step="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Coverage (%)
                </label>
                <input
                  type="number"
                  value={currentProcedure.insuranceCoverage}
                  onChange={(e) => setCurrentProcedure({ ...currentProcedure, insuranceCoverage: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medication (Optional)
              </label>
              <input
                type="text"
                value={currentProcedure.medication || ''}
                onChange={(e) => setCurrentProcedure({ ...currentProcedure, medication: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                placeholder="Enter prescribed medication"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={currentProcedure.notes || ''}
                onChange={(e) => setCurrentProcedure({ ...currentProcedure, notes: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                rows={3}
                placeholder="Enter any additional notes"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleAddProcedure}
                disabled={!currentProcedure.treatment.trim()}
                icon={<Plus size={16} />}
              >
                Add Procedure
              </Button>
            </div>
          </div>
        </div>

        {procedures.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Added Procedures</h4>
            <div className="space-y-3">
              {procedures.map((procedure, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-800">{procedure.treatment}</h5>
                      <div className="flex items-center mt-1">
                        <Badge
                          variant={
                            procedure.urgency === 'High' ? 'danger' :
                            procedure.urgency === 'Medium' ? 'warning' : 'info'
                          }
                          size="sm"
                          className="mr-2"
                        >
                          {procedure.urgency} Urgency
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Coverage: {procedure.insuranceCoverage}%
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-[#0073b9] mt-2">
                        ${procedure.cost}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveProcedure(index)}
                      className="text-red-500 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {procedure.medication && (
                    <div className="mt-3 flex items-center text-gray-600">
                      <Pill size={16} className="mr-2" />
                      {procedure.medication}
                    </div>
                  )}

                  {procedure.notes && (
                    <p className="mt-2 text-sm text-gray-600">{procedure.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center text-yellow-700">
            <AlertTriangle size={16} className="mr-2" />
            <span className="text-sm">Review all procedures before submitting</span>
          </div>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={procedures.length === 0}
          >
            Create Treatment Plan
          </Button>
        </div>
      </div>
    </Card>
  );
};